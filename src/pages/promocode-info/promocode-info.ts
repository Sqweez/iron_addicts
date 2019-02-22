import {Component, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams} from 'ionic-angular';
import {CartPage} from "../cart/cart";
import {Http} from "@angular/http";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";

@Component({
  selector: 'page-promocode-info',
  templateUrl: 'promocode-info.html',
})
export class PromocodeInfoPage {
  count;
  id: number;
  item: any;
  goods: any;
  client: any;
  total_price: number;
  cashback: number;
  @ViewChild(Navbar) navBar: Navbar;

  constructor(public pgtr: NativePageTransitions, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.id = this.navParams.get("item").id;
    let url = `http://iron.controlsoft.kz/mobile-app.php?action=getPromocodeInfo&id=${this.id}`;
    this.http.get(url).subscribe(data => {
      this.item = data;
      this.item = this.item._body;
      this.item = JSON.parse(this.item);
      this.goods = JSON.parse(this.item.items);
      this.client = JSON.parse(this.item.promocode);
      this.total_price = this.getTotalCost(this.goods);
      this.cashback = this.getCashBack(this.total_price, this.client.disc);
      console.log(this.client);
    });
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
    this.count = Number(localStorage.getItem("cart-item-count"));
  }

  getTotalCost = (object) => {
    let cost = 0;
    Object.keys(object).forEach((item, index) => {
      let value = object[item];
      cost += value.prodazhnaya_cena * value.count;
    })
    return cost;
  };


  getCashBack = (total_price, percent) => {
    if(percent == 7){
      return total_price * 0.05;
    }
    if(percent == 10){
      return total_price * 0.02;
    }
  };

  openCart() {
    this.navCtrl.push(CartPage);
  }

}
