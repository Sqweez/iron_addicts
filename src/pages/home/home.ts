import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as $ from 'jquery';
import {SubcategoriesPage} from "../subcategories/subcategories";
import {CartPage} from "../cart/cart";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    $('#1').addClass('activeHighlight');
    $('#5').removeClass('activeHighlight');
    $('#1 > div > div > ion-label > img').removeClass('sideBarIcons');
    $('#5 > div > div > ion-label > img').addClass('sideBarIcons');
  }
  ionViewDidEnter(){
    $('#1').addClass('activeHighlight');
    $('#1 > div > div > ion-label > img').removeClass('sideBarIcons');
  }

  ionViewDidLeave(){
    $('#1').removeClass('activeHighlight');
    $('#1 > div > div > ion-label > img').addClass('sideBarIcons');
  }
  pushToPage(){
    this.navCtrl.push(SubcategoriesPage)
  }

  openCart(){
    this.navCtrl.push(CartPage);
  }
  addClass(){
    let element = $('.content');
    element.addClass("blurredContent");
  }

}
