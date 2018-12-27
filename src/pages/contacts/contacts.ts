import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CartPage} from "../cart/cart";
import * as $ from "jquery";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {CacheService} from "ionic-cache";
import {CallNumber} from "@ionic-native/call-number";
import {EmailComposer} from "@ionic-native/email-composer";
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";

/**
 * Generated class for the ContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  contacts: Observable<any>;
  subKey = 'contacts';
  key = 'contacts';
  count;
  options;
  constructor(
    public callNumber: CallNumber,
    public cache: CacheService,
    public http: Http,
    public navCtrl: NavController,
    public navParams: NavParams,
    public emailComposer: EmailComposer,
    public browser: InAppBrowser
  ) {
    this.cache.clearAll();
    this.getContacts();
    const options: InAppBrowserOptions = {
      zoom: 'no',
      hideurlbar: 'yes',
      location: 'no',
      hardwareback: 'yes'
    };
    this.options = options;

    console.log(localStorage.getItem("cart-item-count"));
  }

  ionViewDidLoad() {
    this.count = Number(localStorage.getItem("cart-item-count"));
  }
  openCart(){
    this.navCtrl.push(CartPage);
  }
  addClass(){
    let element = $('.content');
    element.addClass("blurredContent");
  }

  getContacts(){
    let url = "http://iron.controlsoft.kz/mobile-app.php";
    let postData = new FormData();
    postData.append("action", "getContacts");
    let req = this.http.post(url, postData)
      .map(res => {
        return res.json();
      });
    this.contacts = this.cache.loadFromObservable(this.key, req, this.subKey);
  }
  call(phone){
    this.callNumber.callNumber(phone, true);
  }
  open2GIS(url){
    this.browser.create('https://m.2gis.kz/pavlodar/search/Iron%20Addicts/firm/70000001030273612?lang=ru&mapview=76.956825%2C52.295252%2F11', '_blank', this.options).show();
  }

  openURL(url){
    const browser = this.browser.create('http://' + url, '_blank', this.options,).show();
  }
  openInsta(url){
    const browser = this.browser.create('https://www.instagram.com/' + url, '_blank', this.options).show();
  }
  mail(mail){
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
    this.emailComposer.open({
      app: 'gmail',
      to:   mail
    });
  }
  openWhatsApp(phone){
    phone = phone.replace("+", "");
    phone = phone.split(" ");
    phone = phone.join("");
    window.open('https://api.whatsapp.com/send?phone=' + phone, '_system');
  }
}
