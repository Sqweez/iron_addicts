import {Component, ViewChild} from '@angular/core';
import {IonicPage, ModalController, Navbar, NavController, NavParams} from 'ionic-angular';
import {CartPage} from "../cart/cart";
import {ItemsInfoPage} from "../items-info/items-info";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {DatabaseProvider} from "../../providers/database/database";
import swal from 'sweetalert';
import * as $ from "jquery";
import {CacheService} from "ionic-cache";
import {ModalPage} from "../modal/modal";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the ItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {
  products: Observable<any>;
  request;
  count = Number(localStorage.getItem("cart-item-count"));
  id;
  itemKey;
  key;
  name;
  @ViewChild(Navbar) navBar: Navbar
  constructor(public pgtr: NativePageTransitions, public modal: ModalController, public cache: CacheService, public database: DatabaseProvider, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    let data = this.navParams.get("data");
    this.id = data[0];
    this.name = data[1];
    this.key = 'items ' + this.id;
    this.itemKey = 'items';
    this.getProducts();
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

  getProducts() {
    let url = "http://ironaddicts.kz/admin/mobile-app.php?action=getGoodsList&sub=" + this.id;
    let req = this.http.get(url)
      .map(res => {
        return res.json();
      });
    this.products = this.cache.loadFromObservable(this.key, req, this.itemKey);

  }

  openCart() {
    this.navCtrl.push(CartPage);
  }

  ionViewDidEnter() {
    this.count = Number(localStorage.getItem("cart-item-count"));
  }

  addToDb(item, data){
    this.database.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        let date = day + "." + month + "." + year;
        item.product_id = data.id;
        item.product_vkus = data.vkus;
        item.sklad_count = 0;
        this.database.addToCart(data.id, item, date).then(() => {
          swal("", "Товар добавлен в корзину", "success");
          localStorage.setItem("cart-item-count", String(this.count + 1));
          this.count++;
        });
      }
    });
  }

  async addToCart(item) {
    if (item.count > 0) {
      let product;
      let url = "http://ironaddicts.kz/admin/mobile-app.php?action=getGoodInfo&sub_id=" + item.podcategory_id + "&product_name=" + item.product_name + "&price=" + item.product_price + "&massa=" + item.massa;
      this.http.get(url).subscribe(data => {
        this.request = data;
        this.request = this.request._body;
        this.request = JSON.parse(this.request);
        let items = this.request;
        if (!(items[0].product_vkus == "-" || items.length == 1)) {
          let data = {message: item};
          let modalPage = this.modal.create(ModalPage, data);
          modalPage.onDidDismiss(data => {
            this.addToDb(item, data);
          });
          modalPage.present();
        }
        else{
          let data = {id: item.product_id, vkus: item.vkus, sklad_count: 0};
          this.addToDb(item, data);
        }
      });

    }
    else {
      swal("Извините!", "Товар закончился", "warning");
    }

  }

  pushToPage(item) {
    this.navCtrl.push(ItemsInfoPage, {item: item});
  }
}
