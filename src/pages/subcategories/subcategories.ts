import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {ItemsPage} from "../items/items";
import {CartPage} from "../cart/cart";
import * as $ from "jquery";
import {Http} from "@angular/http";
import {CacheService} from "ionic-cache";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
/**
 * Generated class for the SubcategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-subcategories',
  templateUrl: 'subcategories.html',
})

export class SubcategoriesPage {
  count;
  data;
  subcategories;
  subKey;
  key;
  id;
  name;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public pgtr: NativePageTransitions, private cache: CacheService, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.data = navParams.get("data");
    this.id = this.data[0];
    this.name = this.data[1];
    this.key = 'subcategories ' + this.id;
    this.subKey = 'subcategories';
    console.log(this.id);
    this.getSubCategories(this.id);
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
  ionViewDidEnter(){
    this.count = Number(localStorage.getItem("cart-item-count"));
  }
  getSubCategories(id) {
    let url = "http://ironaddicts.kz/admin/mobile-app.php";
    let postData = new FormData();
    postData.append("action", "getSubCategories");
    postData.append("categorie_id", id);
    let req = this.http.post(url, postData)
      .map(res => {
        return res.json();
      });
    this.subcategories = this.cache.loadFromObservable(this.key, req, this.subKey);


  }
  pushToPage(id, name){
    let data = [id, name];
    this.navCtrl.push(ItemsPage, {data: data})
  }
  openCart(){
    this.navCtrl.push(CartPage);
  }
  addClass(){
    let element = $('.content');
    element.addClass("blurredContent");
  }

}
