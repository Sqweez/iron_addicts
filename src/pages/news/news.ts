import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CartPage} from "../cart/cart";
import {NewsInfoPage} from "../news-info/news-info";
import * as $ from "jquery";
import {Http} from "@angular/http";

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  count;
  requestData: any;
  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.getNews();
  }
  ionViewDidEnter(){
    this.count = Number(localStorage.getItem("cart-item-count"));
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }
  openCart(){
    this.navCtrl.push(CartPage);
  }
  pushToPage(item){
    this.navCtrl.push(NewsInfoPage, {item: item});
  }
  addClass(){
    let element = $('.content');
    element.addClass("blurredContent");
  }
  getNews(){
    this.http.get('http://ironaddicts.kz/admin/mobile-app.php?action=getNews').subscribe(data => {
      this.requestData = data;
      this.requestData = JSON.parse(this.requestData._body);
      console.log(this.requestData)
    })
  }

}
