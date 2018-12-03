import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from "jquery";

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {


  kek = [1,2,3,4,5];
  count: number = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.count = 1;
  }
  openCart(){
    this.navCtrl.push(CartPage);
  }
  changeCount(state){
    switch(state){
      case "plus":
        this.count++;
        break;
      case "minus":
        if(this.count != 1){
          this.count--;
          break;
        }
      default:
        break;
    }
  }
  addClass(){
    let element = $('.content');
    element.addClass("blurredContent");
  }

}
