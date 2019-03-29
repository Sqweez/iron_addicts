import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {CartPage} from "../cart/cart";
import {Http} from "@angular/http";
import {EmailComposer} from "@ionic-native/email-composer";
import {CallNumber} from "@ionic-native/call-number";

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  count;
  data;
  constructor(
    public emailComposer: EmailComposer,
    public action: ActionSheetController,
    public http: Http,
    public navCtrl: NavController,
    public navParams: NavParams,
    public callNumber: CallNumber) {
    this.getDevInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
    this.count = Number(localStorage.getItem("cart-item-count"));
  }

  getDevInfo(){
    let url = "http://ironaddicts.kz/admin/mobile-app.php?action=getDevInfo";
    this.http.get(url).subscribe(res => {
      this.data = res;
      this.data = this.data._body;
      this.data = JSON.parse(this.data);
      console.log(this.data);
    })
  }

  openCart(){
    this.navCtrl.push(CartPage);
  }

  contact(item){
    let phone = item.phone;
    let email = item.mail;
    let actionSheet = this.action.create({
      title: "Выберите метод связи",
      buttons: [
        {
          text: 'Написать на почту',
          icon: 'mail',
          handler: () => {
            this.mail(email);
          }
        },
        {
          text: "Позвонить",
          icon: 'call',
          handler: () => {
            this.callNumber.callNumber(phone, true)
          }
        },

        {
          text: 'Написать в WhatsApp',
          icon: 'logo-whatsapp',
          handler: () => {
            phone = phone.slice(1);
            phone = '7' + phone;
            window.open('https://api.whatsapp.com/send?phone=' + phone, '_system');
          }
        },
        {
          text: 'Отмена',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  mail(mail){
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
    this.emailComposer.open({
      app: 'gmail',
      to:   mail
    });
  }
}
