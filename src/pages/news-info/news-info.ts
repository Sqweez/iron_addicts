import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import * as $ from "jquery";
import {c} from "@angular/core/src/render3";
import {DomSanitizer} from "@angular/platform-browser";
import {CartPage} from "../cart/cart";
import {Http} from "@angular/http";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the NewsInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-news-info',
  templateUrl: 'news-info.html',
})
export class NewsInfoPage {
  count;
  item: any;
  video: any = '';
  id;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public pgtr: NativePageTransitions, public http: Http, public sanitazer: DomSanitizer, public navCtrl: NavController, public navParams: NavParams) {
    this.item  = this.navParams.get("item");
    console.log(this.item);
    if(this.item.video != ""){
      this.video = this.sanitazer.bypassSecurityTrustHtml(this.item.video);
    }
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (ev:UIEvent) => {
      if(this.navCtrl.canGoBack()){
        let options: NativeTransitionOptions = {
          direction: 'right',
          duration: 200,
          slowdownfactor: -1
        }
        this.pgtr.slide(options);
        this.navCtrl.pop();
      }
    }
  }

  ionViewDidEnter() {
    this.count = Number(localStorage.getItem("cart-item-count"));
    this.isVideoLoaded();
  }

  addClass() {
    let element = $('.content');
    element.addClass("blurredContent");
  }

  openCart() {
    this.navCtrl.push(CartPage);
  }

  isVideoLoaded() {
    let div = document.getElementById('video-container');
    let element = document.getElementsByTagName('iframe');
    let text = document.getElementById('loading');
    element.item(0).onload = function () {
      text.style.display = 'none';
      div.style.display = 'block';
    }
  }

}
