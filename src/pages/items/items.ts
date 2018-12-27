import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {CartPage} from "../cart/cart";
import {ItemsInfoPage} from "../items-info/items-info";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {DatabaseProvider} from "../../providers/database/database";
import swal from 'sweetalert';
import * as $ from "jquery";
import {CacheService} from "ionic-cache";
import {ModalPage} from "../modal/modal";

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
  request;
  count = Number(localStorage.getItem("cart-item-count"));
  id;
  itemKey;
  key;
  name;
  constructor(public modal: ModalController, public cache: CacheService, public database: DatabaseProvider, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    let data = this.navParams.get("data");
    this.id = data[0];
    this.name = data[1];
    this.key = 'items ' + this.id;
    this.itemKey = 'items';
    this.getProducts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsPage');
  }

  getProducts(){
    let url = "http://iron.controlsoft.kz/mobile-app.php?action=getGoodsList&sub=" + this.id;
    let req = this.http.get(url)
      .map(res => {
        console.log(res)
        return res.json();
      });
    this.products = this.cache.loadFromObservable(this.key, req, this.itemKey);

  }

  openCart(){
    this.navCtrl.push(CartPage);
  }
  ionViewDidEnter(){
    this.count = Number(localStorage.getItem("cart-item-count"));
  }
 /* getItem(item, request) {
    let url = "http://iron.controlsoft.kz/mobile-app.php?action=getGoodInfo&sub_id=" + item.podcategory_id + "&product_name=" + item.product_name;
    console.log(url);
    return this.http.get(url).subscribe(data => {
      request = data;
      request = request._body;
      request = JSON.parse(request);
      return request;
    });
  }*/
  addToCart(item){
    if(item.count > 0){
      var data = {message: item};
      console.log(data);
      var modalPage = this.modal.create(ModalPage, data);
      modalPage.onDidDismiss(data => {
        this.database.getDatabaseState().subscribe(rdy => {
          if (rdy) {
            let today = new Date();
            let day = today.getDate();
            let month = today.getMonth() + 1;
            let year = today.getFullYear();
            let date = day + "." + month + "." + year;
            item.product_id = data.id;
            item.product_vkus = data.vkus;
            item.sklad_count = 0;
            this.database.addToCart(data.id, item, date).then(() => {
              swal("", "Товар добавлен в корзину", "success");
              localStorage.setItem("cart-item-count", String(this.count + 1));
              this.count++;
            });
          }
        });
      });
      modalPage.present();
      console.log(item);
    }
    else{
      swal("Извините!", "Товар закончился", "warning");
    }

  }

  pushToPage(item){
    this.navCtrl.push(ItemsInfoPage,{item: item});
  }
}
