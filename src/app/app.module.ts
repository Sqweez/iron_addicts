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
import {SQLite} from "@ionic-native/sqlite";
import {HttpModule} from "@angular/http";
import {CacheModule} from "ionic-cache";
import { DatabaseProvider } from '../providers/database/database';
import {SQLitePorter} from "@ionic-native/sqlite-porter";
import {IonicStorageModule} from "@ionic/storage";
import {BrMaskerModule} from "brmasker-ionic-3";
import {EmailComposer} from "@ionic-native/email-composer";
import {CallNumber} from "@ionic-native/call-number";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {ModalPage} from "../pages/modal/modal";
import {AboutPage} from "../pages/about/about";
import {ModalDostavkaPage} from "../pages/modal-dostavka/modal-dostavka";
import {MakeOrderPage} from "../pages/make-order/make-order";
import {ItemInfoCartPage} from "../pages/item-info-cart/item-info-cart";
import {IonicImageViewerModule} from "ionic-img-viewer";
import {OneSignal} from "@ionic-native/onesignal";
import {EmptyPage} from "../pages/empty/empty";
import {HeaderColor} from "@ionic-native/header-color";

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
    NewsInfoPage,
    ModalPage,
    AboutPage,
    ModalDostavkaPage,
    MakeOrderPage,
    ItemInfoCartPage,
    EmptyPage
  ],
  imports: [
    BrMaskerModule,
    CacheModule.forRoot(),
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: true,
      autoFocusAssist: true,
      scrollPadding: false,
      backButtonText: 'Назад'
    }),
    IonicImageViewerModule,
    IonicStorageModule.forRoot()
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
    NewsInfoPage,
    ModalPage,
    AboutPage,
    ModalDostavkaPage,
    MakeOrderPage,
    ItemInfoCartPage,
    EmptyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativePageTransitions,
    SQLite,
    DatabaseProvider,
    SQLitePorter,
    EmailComposer,
    CallNumber,
    InAppBrowser,
    HeaderColor,
    OneSignal
  ]
})
export class AppModule {}
