import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {RegisterPage} from "../pages/register/register";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";
import {SubcategoriesPage} from "../pages/subcategories/subcategories";
import {NewsPage} from "../pages/news/news";
import {CartPage} from "../pages/cart/cart";
import {MyProfilePage} from "../pages/my-profile/my-profile";
import {ContactsPage} from "../pages/contacts/contacts";
import {ItemsInfoPage} from "../pages/items-info/items-info";
import {ItemsPage} from "../pages/items/items";
import {ShopHistoryPage} from "../pages/shop-history/shop-history";
import {NewsInfoPage} from "../pages/news-info/news-info";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    SubcategoriesPage,
    NewsPage,
    CartPage,
    MyProfilePage,
    ContactsPage,
    ItemsInfoPage,
    ItemsPage,
    ShopHistoryPage,
    NewsInfoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: true,
      autoFocusAssist: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    SubcategoriesPage,
    NewsPage,
    CartPage,
    MyProfilePage,
    ContactsPage,
    ItemsInfoPage,
    ItemsPage,
    ShopHistoryPage,
    NewsInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativePageTransitions
  ]
})
export class AppModule {}
