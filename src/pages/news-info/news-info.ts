import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from "jquery";
import {c} from "@angular/core/src/render3";
import {DomSanitizer} from "@angular/platform-browser";
import {CartPage} from "../cart/cart";

/**
 * Generated class for the NewsInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-info',
  templateUrl: 'news-info.html',
})
export class NewsInfoPage {
  count;
  item: any = {};
  video: any;
  constructor(public sanitazer: DomSanitizer, public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get("item");
    this.video = this.sanitazer.bypassSecurityTrustHtml(this.item.video);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsInfoPage');
  }
  ionViewDidEnter(){
    this.count = Number(localStorage.getItem("cart-item-count"));
    this.isVideoLoaded();
  }
  addClass(){
    let element = $('.content');
    element.addClass("blurredContent");
  }
  openCart(){
    this.navCtrl.push(CartPage);
  }

  isVideoLoaded(){
    let div = document.getElementById('video-container');
    let element = document.getElementsByTagName('iframe');
    let text = document.getElementById('loading');
    element.item(0).onload = function () {
      text.style.display = 'none';
      div.style.display = 'block';
    }
  }

}
