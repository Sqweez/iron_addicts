import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CartPage} from "../cart/cart";
import {ItemsInfoPage} from "../items-info/items-info";

/**
 * Generated class for the ItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsPage');
  }
  lel(str){
    console.log(str);
  }
  openCart(){
    this.navCtrl.push(CartPage);
  }
  pushToPage(){
    this.navCtrl.push(ItemsInfoPage);
  }
}
