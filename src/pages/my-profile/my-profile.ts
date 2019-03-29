import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CartPage} from "../cart/cart";
import * as $ from "jquery";
import {Http} from "@angular/http";

@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {

  count: number;
  response: any;
  data: any;
  user_name: string;
  user_balance: string;
  user_phone: string;
  temp;
  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.getBalance();
  }

  getBalance(){
    let user_id = Number(localStorage.getItem("user_id"));
    let url = "http://ironaddicts.kz/admin/mobile-app.php?action=getBalance&user_id=" + user_id;
    this.http.get(url).subscribe(data => {
      this.response = data;
      this.response = JSON.parse(this.response._body);
      this.user_balance = this.response;
      localStorage.setItem("balans", this.user_balance);
    })
  }

  getShopHistory(){
    let user_id = Number(localStorage.getItem("user_id"));
    let url = "http://ironaddicts.kz/admin/mobile-app.php?action=getShopHistory&user_id=" + user_id;
    this.http.get(url).subscribe(res => {
      this.data = res;
      this.data = this.data._body;
      this.data = JSON.parse(this.data);
      console.log(this.data);
      }
    )
  }

  ionViewDidEnter(){
    this.count = Number(localStorage.getItem("cart-item-count"));
    this.user_name = localStorage.getItem("user_name");
    this.user_phone = localStorage.getItem("phone");
    this.temp = this.user_phone.split('');
    this.temp[1] = this.temp[1] + " ";
    this.temp[4] = this.temp[4] + " ";
    this.temp[7] = this.temp[7] + " ";
    this.temp[9] = this.temp[9] + " ";
    this.user_phone = this.temp.join("");
    this.getShopHistory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }
  openCart(){
    this.navCtrl.push(CartPage);
  }
  addClass(){
    let element = $('.content');
    element.addClass("blurredContent");
  }

}
