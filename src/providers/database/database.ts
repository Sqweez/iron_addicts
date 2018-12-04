import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Http} from "@angular/http";
import {SQLitePorter} from "@ionic-native/sqlite-porter";
import {Platform} from "ionic-angular";
import {Storage} from "@ionic/storage";

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;
  constructor(public http: Http, private sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: '1.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.storage.get("database_filled").then(val => {
          if (val) {
            this.databaseReady.next(true);
            this.getItemCount();
          }
          else {
            this.fillDatabase();
          }
        })
      })
    })
  }
  fillDatabase() {
    let sql = 'create table IF NOT EXISTS `cart` (id INTEGER PRIMARY KEY, product_name TEXT, count INTEGER, product_price TEXT, product_img TEXT, product_vkus TEXT, product_desc TEXT)';
    this.database.executeSql(sql, []).then(res => {
      this.databaseReady.next(true);
      this.storage.set("database_filled", true);
    })
  }

  addToCart(item) {
    let data = [item.product_id, item.product_name, 1, item.product_price, item.product_img, item.product_vkus, item.product_desc];
    return this.database.executeSql("INSERT INTO cart (id, product_name, count, product_price, product_img, product_vkus, product_desc) VALUES (?, ?, ?, ?, ?, ?, ?)", data).then(res => {
      console.log("res = " + res);
    })
  }

  checkIfAlreadyAdded(id) {
    return this.database.executeSql("SELECT * FROM cart WHERE id = ?", [id]).then(res => {
      let product = [];
      if (res.rows.length > 0) {
        product.push({id: res.rows.item(0).id});
      }
      return product;
    }, err => {
      return [];
    })
  }

  async deleteItemFromCart(id){
    this.database.executeSql("DELETE FROM cart WHERE id = ?", [id]).then(res => {
      return this.getAllCart();
    })
  }
  getAllCart() {
    return this.database.executeSql("SELECT * FROM cart", []).then(res => {
      let products = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          products.push({id: res.rows.item(i).id, data: JSON.parse(res.rows.item(i).product)})
        }
      }
      return products;
    }, err => {
      return [];
    })
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }

  getItemCount(){
    this.database.executeSql("SELECT * FROM cart", []).then(res => {
      let count = 0;
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          count = count + res.rows.item(i).count;
        }
      }
      localStorage.setItem("cart-item-count", String(count));
    }, err => {
      return 0;
    });
  }

}
