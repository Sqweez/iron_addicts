import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import * as Odometer from 'odometer';
import * as $ from "jquery";
/**
 * Generated class for the ModalPromocodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-promocode',
  templateUrl: 'modal-promocode.html',
})
export class ModalPromocodePage {
  promocode;
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {

  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    this.promocode = "";
    for(let i = 0; i < 6; i++){
      var random = Math.floor(Math.random() * (+9 - +0) + +0);
      this.promocode += random.toString();
      let digits = document.getElementsByClassName('digit') as HTMLCollectionOf<HTMLElement>;
      digits[i].style.animationDuration = `${(i+1)/3}s`;
      digits[i].innerHTML = random.toString();
    }
  }
  acceptPromocode(){
    this.viewCtrl.dismiss({data: this.promocode});
  }

}
