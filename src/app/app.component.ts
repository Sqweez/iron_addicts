import {Component, ViewChild} from '@angular/core';
import {Events, Nav, Platform} from 'ionic-angular';
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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  page: any;
  pages: Array<{ id: number, title: string, component: any, img: any }>;
  activePage: any;

  constructor(public oneSignal: OneSignal, public cache: CacheService, public events: Events, public nativePageTransitions: NativePageTransitions, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.cache.clearAll();
    var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    let OneSigna = window["plugins"].OneSignal;

    OneSigna.inFocusDisplaying(OneSigna.OSInFocusDisplayOption.InAppAlert);

    window["plugins"].OneSignal
      .startInit("bc0d48c5-b987-4e7e-bfd9-7a6e125090bf", "522039171006")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();
    this.oneSignal.getIds().then(data => {
      let ids = data;
      let push  = ids.userId;
      localStorage.setItem("push", push);
    });
    if(localStorage.getItem("user_name")){
    }
    this.pages = [
      {id: 1, title: 'ГЛАВНАЯ', component: HomePage, img: 'home.png'},
      {id: 2, title: 'НОВОСТИ', component: NewsPage, img: 'news.png'},
      {id: 5, title: 'РЕГИСТРАЦИЯ', component: RegisterPage, img: 'user.png'},
      {id: 6, title: 'КОНТАКТЫ', component: ContactsPage, img: 'kontakt.png'},
      {id: 7, title: 'О РАЗРАБОТЧИКЕ', component: AboutPage, img: 'info.png'}
    ];
    if(localStorage.getItem("balans")){
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
    events.subscribe('user:loggedin', () => {
      this.pages = [
        {id: 1, title: 'ГЛАВНАЯ', component: HomePage, img: 'home.png'},
        {id: 2, title: 'НОВОСТИ', component: NewsPage, img: 'news.png'},
        {id: 3, title: 'КОРЗИНА', component: CartPage, img: 'Korzina1.png'},
        {id: 4, title: 'ИСТОРИЯ ПОКУПОК', component: ShopHistoryPage, img: 'history.png'},
        {id: 5, title: 'МОЙ ПРОФИЛЬ', component: MyProfilePage, img: 'user.png'},
        {id: 6, title: 'КОНТАКТЫ', component: ContactsPage, img: 'kontakt.png'},
        {id: 7, title: 'О РАЗРАБОТЧИКЕ', component: AboutPage, img: 'info.png'}
      ];
      this.activePage = this.pages[0];
    });
    this.activePage = this.pages[0];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
    });
  }

  addClass() {
    let element = $('.content');
    element.addClass("blurredContent");
  }

  removeClass() {
    let element = $('.content');
    element.removeClass("blurredContent");
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  checkActive(page) {
    return page == this.activePage;
  }
}
