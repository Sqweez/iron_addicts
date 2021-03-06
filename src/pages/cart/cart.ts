import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import * as $ from "jquery";
import {DatabaseProvider} from "../../providers/database/database";
import swal from 'sweetalert';
import {async} from "rxjs/scheduler/async";
import {Http} from "@angular/http";
import {HomePage} from "../home/home";
import {MakeOrderPage} from "../make-order/make-order";

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  carts = [];
  count;
  balance: any;
  response: any;
  sellsHist: any;
  choosenDiscount;
  constructor(public http: Http, public database: DatabaseProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.carts = [];
    this.getBalance();
    this.database.getDatabaseState().subscribe(val => {
      if (val) {
        this.database.getAllCartAtStart().then(data => {
          console.log(data);
          this.carts = data;
        }).then(() => {
        });
      }
    })
  }

  ionViewDidLoad() {
    this.count = localStorage.getItem('cart-item-count');
    this.http.get('http://ironaddicts.kz/admin/mobile-app.php?action=getSellsSummary&id=' + localStorage.getItem("user_id")).subscribe(data => {
      this.sellsHist = data;
      this.sellsHist = this.sellsHist._body;
      localStorage.setItem("skidka", this.sellsHist);
    });
  }

  getCost(a, b) {
    return a * b;
  }

  getBalance() {
    let user_id = Number(localStorage.getItem("user_id"));
    let url = "http://ironaddicts.kz/admin/mobile-app.php?action=getBalance&user_id=" + user_id;
    return this.http.get(url).subscribe(data => {
      this.balance = data;
      this.balance = this.balance._body;
      localStorage.setItem("balans", this.balance);
      return this.balance;
    });
  }

  openCart() {
    this.navCtrl.setRoot(CartPage);
  }

  getCount(count) {
    return count;
  }

  getTotalCount() {
    let count = 0;
    this.carts.forEach(function (item) {
      count += Number(item.count);
    });
    return count;
  }

  getTotalPrice(par) {
    let totalCount = 0;
    this.carts.forEach(function (item) {
      totalCount = totalCount + (item.count * item.product_price);
    });

    let discount = parseInt(localStorage.getItem("skidka"));

    let summary_discount = 0;

    if (totalCount >= 15000) {
      summary_discount = 5;
    }
    if (totalCount >= 30000) {
      summary_discount = 10;
    }
    let finalDisc = (discount >= summary_discount) ? discount : summary_discount;
    finalDisc = finalDisc/100;
    if (!discount || discount == 0) {
      $("span#disc_text").html('Итого:');
    }
    else {
      $("span#disc_text").html('Итого cо скидкой:');
    }
      this.choosenDiscount = discount;
      return Math.floor(totalCount - (totalCount * finalDisc));
  }

  deleteItem(id, count) {
    this.database.deleteItemFromCart(id).then(() => {
      this.database.getAllCart().then(data => {
        this.carts = data;
        this.count = this.count - count;
      })
    })
  }

  updateProductCount(id, count, state, skladCount) {
    if (state == '+') {
      if (count < skladCount) {
        this.database.updateProductCount(state, id, count + 1);
        this.count++;
      }
      else {
        let msg;
        if (skladCount == 0) {
          msg = "Выбранный вами товар отсутствует на складе";
        }
        else if (skladCount == 1) {
          msg = "В наличие имеется только " + skladCount + " единица выбранного товара!"
        }
        else if (skladCount > 1 && skladCount < 5) {
          msg = "В наличие имеется только " + skladCount + " единицы выбранного товара!"
        }
        else {
          msg = "В наличие имеется только " + skladCount + " единиц выбранного товара!"
        }
        swal("Извините!", msg, "error");
      }
    }
    else if (state == '-') {
      if (count > 1) {
        this.database.updateProductCount(state, id, count - 1);
        this.count--;
      }
    }
    this.database.getAllCart().then(data => {
      this.carts = data;
    });
  }

  postBuy() {
    let user_id = Number(localStorage.getItem("user_id"));
    this.getBalance();
    let balans = Number(localStorage.getItem("balans"));
    let cart = Array.from(this.carts);
    let data = JSON.stringify(cart);
    let array = [data, user_id, balans, this.choosenDiscount];
    this.navCtrl.push(MakeOrderPage, {data: array});
  }

  ionViewDidEnter() {
    $('#3').addClass('activeHighlight');
    $('#3 > div > div > ion-label > img').removeClass('sideBarIcons');
  }

  ionViewDidLeave() {
    $('#3').removeClass('activeHighlight');
    $('#3 > div > div > ion-label > img').addClass('sideBarIcons');
  }

  addClass() {
    let element = $('.content');
    element.addClass("blurredContent");
    $('.footer').addClass("blurredContent");
  }

  buy() {
    if (this.count > 0) {
      if (!localStorage.getItem("user_name")) {
        swal("", "Для совершения покупок вы должны быть зарегистрированы", "error")
      }
      else {
        swal({
          title: "Внимание!",
          text: "Вы уверены, что хотите купить выбранные товары?",
          buttons: ["Нет", "Да"],
          icon: "warning"
        }).then(res => {
          if (res) {
            this.postBuy();
          }
        })
      }
    }
    else {
      swal("Внимание!", "Ваша корзина пуста или товары, которые вы пытаетесь купить на данный момент недоступны!", "error");
    }


  }

}
