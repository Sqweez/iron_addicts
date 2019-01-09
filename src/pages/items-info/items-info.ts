import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CartPage} from "../cart/cart";
import swal from "sweetalert";
import {DatabaseProvider} from "../../providers/database/database";
import {Http} from "@angular/http";
import {DomSanitizer} from "@angular/platform-browser";

/**
 * Generated class for the ItemsInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-items-info',
  templateUrl: 'items-info.html',
})
export class ItemsInfoPage {
  product: any;
  count;
  isAdded: boolean;
  product_vkus;
  vkus;
  product_count;
  description;
  constructor(public sanitazer: DomSanitizer, public http: Http, public database: DatabaseProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get("item");
    this.description = this.product.product_desc;
    this.description = sanitazer.bypassSecurityTrustHtml(this.description);
    console.log(this.product);
    this.getItem();
    /*this.database.checkIfAlreadyAdded(this.product.product_id).then(data => {
      if(this.isEmpty(data)) {
        this.isAdded = false;
      }
      else {
        this.isAdded = true;
      }
      console.log(this.isAdded);
    })*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsInfoPage');
  }

  openCart() {
    this.navCtrl.push(CartPage);
  }

  getItem() {
    let url = "http://iron.controlsoft.kz/mobile-app.php?action=getGoodInfo&sub_id=" + this.product.podcategory_id + "&product_name=" + this.product.product_name + "&price=" + this.product.product_price + "&massa=" + this.product.massa;
    console.log(url);
    this.http.get(url).subscribe(data => {
      this.product_vkus = data;
      this.product_vkus = this.product_vkus._body;
      this.product_vkus = JSON.parse(this.product_vkus);
    })
  }

  addToCart(item) {
    if(item.count > 0){
      if (!this.vkus) {
        swal("", "Выберите вкус", "error");
      }
      else {
        let product_id = this.vkus;
        let vkus_name = 0;
        this.product_vkus.forEach(function (item) {
          if(item["product_id"] == product_id){
            vkus_name = item["product_vkus"];
          }
        });
        this.database.getDatabaseState().subscribe(rdy => {
          if (rdy) {
            let today = new Date();
            let day = today.getDate();
            let month = today.getMonth() + 1;
            let year = today.getFullYear();
            let date = day + "." + month + "." + year;
            item.sklad_count = 0;
            item.product_vkus = vkus_name;
            this.database.addToCart(this.vkus, item, date).then(() => {
              swal("", "Товар добавлен в корзину", "success");
              localStorage.setItem("cart-item-count", String(this.count + 1));
              this.count++;
              this.isAdded = true;
            });
          }
        });
      }
    }
    else{
      swal("Извините! Товар закончился");
    }

  }

  ionViewDidEnter() {
    this.count = Number(localStorage.getItem("cart-item-count"));
  }

  isEmpty(obj) {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    if (obj == null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    if (typeof obj !== "object") return true;
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  }


}
