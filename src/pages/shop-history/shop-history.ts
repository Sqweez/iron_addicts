import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from "jquery";
import {CartPage} from "../cart/cart";
import {Http} from "@angular/http";
import {ItemsInfoPage} from "../items-info/items-info";

/**
 * Generated class for the ShopHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-shop-history',
  templateUrl: 'shop-history.html',
})
export class ShopHistoryPage {
  count;
  data;
  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.getShopHistory();
  }

  pushToPage(item) {
    this.navCtrl.push(ItemsInfoPage, {item: item});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopHistoryPage');
  }

  ionViewDidEnter(){
    this.count = Number(localStorage.getItem("cart-item-count"));
  }

  addClass(){
    let element = $('.content');
    element.addClass("blurredContent");
  }

  getShopHistory(){
    let user_id = Number(localStorage.getItem("user_id"));
    let url = "http://ironaddicts.kz/admin/mobile-app.php?action=getSells&user_id=" + user_id;
    this.http.get(url).subscribe(res => {
        this.data = res;
        this.data = this.data._body;
        this.data = JSON.parse(this.data);
        console.log(this.data);
      }
    )
  }

  openCart(){
    this.navCtrl.setRoot(CartPage);
  }

}
