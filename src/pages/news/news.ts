import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CartPage} from "../cart/cart";
import {NewsInfoPage} from "../news-info/news-info";
import * as $ from "jquery";

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }
  openCart(){
    this.navCtrl.push(CartPage);
  }
  pushToPage(){
    this.navCtrl.push(NewsInfoPage);
  }
  addClass(){
    let element = $('.content');
    element.addClass("blurredContent");
  }
}
