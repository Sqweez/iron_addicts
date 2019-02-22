import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import swal from "sweetalert";
import {Http} from "@angular/http";

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  vkus;
  item;
  request;
  items;
  isEmptyTaste: boolean = false;

  constructor(public http: Http, public database: DatabaseProvider, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get("message");
    this.getItem(this.item);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  getItem(item) {
    let url = "http://iron.controlsoft.kz/mobile-app.php?action=getGoodInfo&sub_id=" + item.podcategory_id + "&product_name=" + item.product_name + "&price=" + item.product_price + "&massa=" + item.massa;
    return this.http.get(url).subscribe(data => {
      this.request = data;
      this.request = this.request._body;
      this.request = JSON.parse(this.request);
      this.items = this.request;
      if (this.items[0].product_vkus == "-" && this.items.length == 1) {
        return this.isEmptyTaste = true;
      }
      this.vkus = this.items[0].product_id;
    });
  }

  addToCart() {
    if (!this.vkus) {
      swal("", "Выберите вкус", "error");
    }
    else {
      let product_id = this.vkus;
      let vkus_name = 0;
      this.items.forEach(function (item) {
        if (item["product_id"] == product_id) {
          vkus_name = item["product_vkus"];
        }
      });
      let data = {id: this.vkus, vkus: vkus_name, sklad_count: 0};
      console.log(data);
      this.viewCtrl.dismiss(data);
    }
  }

}
