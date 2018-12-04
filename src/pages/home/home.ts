import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as $ from 'jquery';
import {SubcategoriesPage} from "../subcategories/subcategories";
import {CartPage} from "../cart/cart";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {DatabaseProvider} from "../../providers/database/database";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  count;
  categories: Observable<any>;
  constructor(public database: DatabaseProvider, public http: Http, public navCtrl: NavController) {
    $('#1').addClass('activeHighlight');
    $('#5').removeClass('activeHighlight');
    $('#1 > div > div > ion-label > img').removeClass('sideBarIcons');
    $('#5 > div > div > ion-label > img').addClass('sideBarIcons');
    this.getCategories();
  }

  getCategories(){
    let url = "http://iron.controlsoft.kz/mobile-app.php";
    let postData = new FormData();
    postData.append("action", "getCategories");
    let req = this.http.post(url, postData)
      .map(res => {
        return res.json();
      });
    this.categories = req;
    this.categories.subscribe(res => {
      console.log(res.length)
    })
  }


  ionViewDidEnter(){
    this.count = Number(localStorage.getItem("cart-item-count"));
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
