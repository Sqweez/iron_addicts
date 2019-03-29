import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as $ from 'jquery';
import {SubcategoriesPage} from "../subcategories/subcategories";
import {CartPage} from "../cart/cart";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {DatabaseProvider} from "../../providers/database/database";
import swal from "sweetalert";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {HeaderColor} from "@ionic-native/header-color";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  count;
  categories: Observable<any>;
  constructor(public nativePageTransitions: NativePageTransitions, public headerColor: HeaderColor, public statusBar: StatusBar, public splashScreen: SplashScreen, public database: DatabaseProvider, public http: Http, public navCtrl: NavController) {
    $('#1').addClass('activeHighlight');
    $('#5').removeClass('activeHighlight');
    $('#1 > div > div > ion-label > img').removeClass('sideBarIcons');
    $('#5 > div > div > ion-label > img').addClass('sideBarIcons');
    this.getCategories();
  }

  getCategories(){
    let url = "http://ironaddicts.kz/admin/mobile-app.php";
    let postData = new FormData();
    postData.append("action", "getCategories");
    let req = this.http.post(url, postData)
      .map(res => {
        this.statusBar.backgroundColorByHexString('#2a2a2a');
        this.headerColor.tint('#2a2a2a');
        this.splashScreen.hide();
        return res.json();
      });
    this.categories = req;
  }


  ionViewDidEnter(){
    this.count = Number(localStorage.getItem("cart-item-count"));
    $('#1').addClass('activeHighlight');
    $('#1 > div > div > ion-label > img').removeClass('sideBarIcons');
  }

  ionViewDidLeave(){
    $('#1').removeClass('activeHighlight');
    $('#1 > div > div > ion-label > img').addClass('sideBarIcons');
  }
  pushToPage(id, name){
    console.log(id);
    let data = [id, name];
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 200,
      slowdownfactor: -1
    }
    this.nativePageTransitions.slide(options);
    this.navCtrl.push(SubcategoriesPage, {data: data})
  }

  openCart(){
    this.navCtrl.push(CartPage);
  }
  addClass(){
    let element = $('.content');
    element.addClass("blurredContent");
  }

}
