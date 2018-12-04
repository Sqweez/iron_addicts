import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ id: number, title: string, component: any, img: any }>;
  activePage: any;
  constructor(public nativePageTransitions: NativePageTransitions, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {id: 1, title: 'ГЛАВНАЯ', component: HomePage, img: 'home.png'},
      {id: 2, title: 'НОВОСТИ', component: NewsPage, img: 'news.png'},
      {id: 3, title: 'КОРЗИНА', component: CartPage, img: 'Korzina1.png'},
      {id: 4, title: 'ИСТОРИЯ ПОКУПОК', component: ShopHistoryPage, img: 'history.png'},
      {id: 5, title: 'МОЙ ПРОФИЛЬ', component: MyProfilePage, img: 'user.png'},
      {id: 6, title: 'КОНТАКТЫ', component: ContactsPage, img: 'kontakt.png'}
    ];
    this.activePage = this.pages[0];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  addClass(){
    let element = $('.content');
    element.addClass("blurredContent");
  }
  removeClass(){
    let element = $('.content');
    element.removeClass("blurredContent");
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.activePage = page;
  }
  checkActive(page){
    return page == this.activePage;
  }
}
