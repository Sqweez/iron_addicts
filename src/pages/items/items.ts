import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CartPage} from "../cart/cart";
import {ItemsInfoPage} from "../items-info/items-info";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {DatabaseProvider} from "../../providers/database/database";
import swal from 'sweetalert';

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
  products: Observable<any>;
  countItems = Number(localStorage.getItem("cart-item-count"));
  constructor(public database: DatabaseProvider, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.getProducts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsPage');
  }

  getProducts(){
    let url = "http://iron.controlsoft.kz/mobile-app.php";
    let postData = new FormData();
    postData.append("action", "getGoodsList");
    let req = this.http.post(url, postData)
      .map(res => {
        return res.json();
      });
    this.products = req;
    this.products.subscribe(res => {
      console.log(res.length);
    })
  }

  openCart(){
    this.navCtrl.push(CartPage);
  }

  addToCart(item){
    console.log(item);
    this.database.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.database.addToCart(item).then(res => {
          swal("", "Товар добавлен в корзину", "success");
          localStorage.setItem("cart-item-count", String(this.countItems + 1));
        });
      }
    });
  }

  pushToPage(item){
    this.navCtrl.push(ItemsInfoPage,{item: item});
  }
}
