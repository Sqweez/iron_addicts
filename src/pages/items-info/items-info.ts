import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CartPage} from "../cart/cart";

/**
 * Generated class for the ItemsInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-items-info',
  templateUrl: 'items-info.html',
})
export class ItemsInfoPage {
  product: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get("item");
    console.log(this.product);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsInfoPage');
  }
  openCart(){
    this.navCtrl.push(CartPage);
  }


}
