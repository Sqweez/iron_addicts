import {Component} from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import * as $ from "jquery";
import {CartPage} from "../cart/cart";
import {ModalPromocodePage} from "../modal-promocode/modal-promocode";
import {Odometer} from 'odometer';
import {Http} from "@angular/http";
import {PromocodeInfoPage} from "../promocode-info/promocode-info";

@Component({
  selector: 'page-trainer',
  templateUrl: 'trainer.html',
})
export class TrainerPage {

  count;
  promocodes;

  constructor(public http: Http, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    this.getPromocodes()
  }

  getPromocodes = () => {
    let url = "http://iron.controlsoft.kz/mobile-app.php?action=getPromocodes&user=" + localStorage.getItem("user_id");
    this.http.get(url).subscribe(data => {
      this.promocodes = data;
      this.promocodes = JSON.parse(this.promocodes._body);
    })
  }

  addClass() {
    let element = $('.content');
    element.addClass("blurredContent");
    $('.footer').addClass("blurredContent");
  }

  openCart() {
    this.navCtrl.push(CartPage);
  }

  deletePromocode(id) {
    this.http.get("http://iron.controlsoft.kz/mobile-app.php?id=" + id + "&action=deletePromocode").subscribe(data => {
      this.getPromocodes();
    })
  }

  pushToPage(item) {
    if (item.prodazha_code != 0) {
      this.navCtrl.push(PromocodeInfoPage, {item: item});
    }
  }

  ionViewDidLoad() {
    this.count = Number(localStorage.getItem("cart-item-count"));
  }

  generatePromocode() {
    let modalPage = this.modalCtrl.create(ModalPromocodePage);
    modalPage.onDidDismiss(data => {
      if (data != undefined) {
        let url = 'http://iron.controlsoft.kz/mobile-app.php';
        let formData = new FormData();
        formData.append("promocode", data.data);
        formData.append("user", localStorage.getItem("user_id"));
        formData.append("action", 'generatePromocode');
        this.http.post(url, formData).subscribe(data => {
          let url = "http://iron.controlsoft.kz/mobile-app.php?action=getPromocodes&user=" + localStorage.getItem("user_id");
          this.http.get(url).subscribe(data => {
            this.promocodes = data;
            this.promocodes = JSON.parse(this.promocodes._body);
          })
        })
      }
    })
    modalPage.present();
  }

}
