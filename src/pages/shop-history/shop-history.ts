import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from "jquery";

/**
 * Generated class for the ShopHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop-history',
  templateUrl: 'shop-history.html',
})
export class ShopHistoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopHistoryPage');
  }
  addClass(){
    let element = $('.content');
    element.addClass("blurredContent");
  }
}
