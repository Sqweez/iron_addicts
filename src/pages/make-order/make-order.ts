import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";
import {HomePage} from "../home/home";
import {DatabaseProvider} from "../../providers/database/database";
import swal from 'sweetalert';
import {CacheService} from "ionic-cache";

/**
 * Generated class for the MakeOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-make-order',
  templateUrl: 'make-order.html',
})
export class MakeOrderPage {

  data;
  user_id;
  cart;
  dostavka = 1;
  oplata = 1;
  response;
  balans;
  comment;
  constructor(public cache: CacheService, public database: DatabaseProvider, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get('data');
    this.cart = this.data[0];
    this.user_id = this.data[1];
    this.balans = this.data[2];
    console.log(this.cart);
    console.log(this.user_id);
    console.log(this.balans);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MakeOrderPage');
  }


  buy(dostavka, oplata, comment) {
    let url = "http://iron.controlsoft.kz/mobile-app.php?action=buy&data=" + this.cart + "&user_id=" + this.user_id + "&balans=" + this.balans + '&dostavka=' + dostavka + '&oplata=' + oplata + '&comment=' + comment;
    this.http.get(url).subscribe(data => {
      this.response = data;
      this.response = this.response._body;
      console.log(data);
      this.database.clearCart();
      localStorage.setItem("cart-item-count", String(0));
      swal("", "Ваш заказ успешно обработан! В течение некоторого времени с вами свяжется оператор!", "success").then(() => {
        this.cache.clearGroup("items");
        this.navCtrl.setRoot(HomePage);
      });
    });
  }
}
