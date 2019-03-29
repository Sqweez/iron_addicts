import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CartPage} from "../cart/cart";

/**
 * Generated class for the EmptyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-empty',
  templateUrl: 'empty.html',
})
export class EmptyPage {
  count;
  data;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmptyPage');
  }
  ionViewDidEnter(){
    this.count = Number(localStorage.getItem("cart-item-count"));
  }
  openCart(){
    this.navCtrl.push(CartPage);
  }

}
