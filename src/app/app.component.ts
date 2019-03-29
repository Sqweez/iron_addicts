import {Component, ViewChild} from '@angular/core';
import {AlertController, App, Events, Nav, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import * as $ from 'jquery'
import {RegisterPage} from "../pages/register/register";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {NewsPage} from "../pages/news/news";
import {CartPage} from "../pages/cart/cart";
import {ShopHistoryPage} from "../pages/shop-history/shop-history";
import {ContactsPage} from "../pages/contacts/contacts";
import {ItemsPage} from "../pages/items/items";
import {ItemsInfoPage} from "../pages/items-info/items-info";
import {MyProfilePage} from "../pages/my-profile/my-profile";
import {DatabaseProvider} from "../providers/database/database";
import {CacheService} from "ionic-cache";
import {AboutPage} from "../pages/about/about";
import {MakeOrderPage} from "../pages/make-order/make-order";
import {OneSignal} from "@ionic-native/onesignal";
import {Http} from "@angular/http";
import {EmptyPage} from "../pages/empty/empty";
import {NewsInfoPage} from "../pages/news-info/news-info";
import {TrainerPage} from "../pages/trainer/trainer";
import swal from "sweetalert";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  page: any;
  pages: Array<{ id: number, title: string, component: any, img: any }>;
  activePage: any;
  request;
  news: any;
  item;

  constructor(public alertCtrl: AlertController, public pgtr: NativePageTransitions, public oneSignal: OneSignal, public app: App, public http: Http, public cache: CacheService, public events: Events, public nativePageTransitions: NativePageTransitions, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.cache.clearAll();
    if (this.platform.is('cordova')) {
      var notificationOpenedCallback = function (jsonData) {
        let request = jsonData.notification.payload.additionalData;
        console.log(request);
        let type = request.type;
        switch (type) {
          case 'birthday':
            app.getActiveNav().setRoot(EmptyPage, {data: request.data});
            break;
          case 'news':
            let item = {name: request.name, text: request.text, img: request.img, video: request.video};
            app.getActiveNav().setRoot(NewsInfoPage, {item: item});
            break;
          default:
            break;
        }
      };

      let OneSigna = window["plugins"].OneSignal;

      OneSigna.inFocusDisplaying(OneSigna.OSInFocusDisplayOption.InAppAlert);

      window["plugins"].OneSignal
        .startInit("2de9db68-ce1f-47c0-a8ce-f5ad7c70a87a", "369774151086")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
    }

    this.oneSignal.getIds().then(data => {
      let ids = data;
      let push = ids.userId;
      console.log('push ' + push);
      localStorage.setItem("push", push);
    });

    let trainer = {
      id: 8,
      title: 'ТРЕНЕР',
      component: TrainerPage,
      img: 'trainer.png'
    };

    if (localStorage.getItem("user_name")) {
      let id = localStorage.getItem("user_id");
      let url = "http://ironaddicts.kz/admin/mobile-app.php?action=getPush&id=" + id;
      this.http.get(url).subscribe(data => {
        this.request = data;
        this.request = this.request._body;
        let push = this.request;
        if (push == "") {
          let newPush = localStorage.getItem("push");
          let url = "http://ironaddicts.kz/admin/mobile-app.php?action=setPush&id=" + id + "&push=" + newPush;
          this.http.get(url).subscribe(() => {
          });
        }
      })
    }
    this.pages = [
      {id: 1, title: 'ГЛАВНАЯ', component: HomePage, img: 'home.png'},
      {id: 2, title: 'НОВОСТИ', component: NewsPage, img: 'news.png'},
      {id: 5, title: 'РЕГИСТРАЦИЯ', component: RegisterPage, img: 'user.png'},
      {id: 6, title: 'КОНТАКТЫ', component: ContactsPage, img: 'kontakt.png'},
      {id: 7, title: 'О РАЗРАБОТЧИКЕ', component: AboutPage, img: 'info.png'}
    ];
    if (localStorage.getItem("balans")) {
      this.pages = [
        {id: 1, title: 'ГЛАВНАЯ', component: HomePage, img: 'home.png'},
        {id: 2, title: 'НОВОСТИ', component: NewsPage, img: 'news.png'},
        {id: 3, title: 'КОРЗИНА', component: CartPage, img: 'Korzina1.png'},
        {id: 4, title: 'ИСТОРИЯ ПОКУПОК', component: ShopHistoryPage, img: 'history.png'},
        {id: 5, title: 'МОЙ ПРОФИЛЬ', component: MyProfilePage, img: 'user.png'},
        {id: 6, title: 'КОНТАКТЫ', component: ContactsPage, img: 'kontakt.png'},
        {id: 7, title: 'О РАЗРАБОТЧИКЕ', component: AboutPage, img: 'info.png'}
      ];
    }
    let isTrener = parseInt(localStorage.getItem("isTrener"));
    if (isTrener == 1) {
      this.pages.push(trainer)
    }

    events.subscribe('user:loggedin', () => {
      let isTrener = parseInt(localStorage.getItem("isTrener"));
      this.pages = [
        {id: 1, title: 'ГЛАВНАЯ', component: HomePage, img: 'home.png'},
        {id: 2, title: 'НОВОСТИ', component: NewsPage, img: 'news.png'},
        {id: 3, title: 'КОРЗИНА', component: CartPage, img: 'Korzina1.png'},
        {id: 4, title: 'ИСТОРИЯ ПОКУПОК', component: ShopHistoryPage, img: 'history.png'},
        {id: 5, title: 'МОЙ ПРОФИЛЬ', component: MyProfilePage, img: 'user.png'},
        {id: 6, title: 'КОНТАКТЫ', component: ContactsPage, img: 'kontakt.png'},
        {id: 7, title: 'О РАЗРАБОТЧИКЕ', component: AboutPage, img: 'info.png'}
      ];
      if (isTrener == 1) {
        this.pages.push(trainer)
      }
      this.activePage = this.pages[0];
    });
    this.activePage = this.pages[0];

  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

      this.platform.registerBackButtonAction(() => {
        if(this.nav.canGoBack()){
          let options: NativeTransitionOptions = {
            direction: 'right',
            duration: 250,
            slowdownfactor: -1
          }
          this.pgtr.slide(options);
          this.nav.pop();
        }
        else{
          let activePage = this.nav.getActive().name;
          if(activePage == "HomePage"){
            swal({
              title: "Закрытие приложение",
              text: "Вы хотите закрыть приложение?",
              buttons: ["Отмена", "Закрыть"],
              icon: "warning"
            }).then(res => {
              if(res){
                this.platform.exitApp();
              }
            })
          }
          else{
            let el = $('.activeHighlight');
            el.removeClass('activeHighlight');
            el.find('img').addClass('sideBarIcons');
            this.nav.setRoot(HomePage);
          }
        }
      });
    });
  }

  addClass() {
    let element = $('.content');
    element.addClass("blurredContent");
  }

  removeClass() {
    let element = $('.content');
    element.removeClass("blurredContent");
    $('.footer').removeClass("blurredContent");
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  checkActive(page) {
    return page == this.activePage;
  }
}
