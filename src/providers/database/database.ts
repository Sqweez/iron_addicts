import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
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
  request: any;
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
    let sql = 'create table IF NOT EXISTS `cart` (id INTEGER PRIMARY KEY, product_name TEXT, count INTEGER, product_price TEXT, product_img TEXT, product_vkus TEXT, product_desc TEXT, date TEXT, sklad_count INTEGER, massa TEXT)';
    this.database.executeSql(sql, []).then(res => {
      this.databaseReady.next(true);
      this.storage.set("database_filled", true);
    })
  }

  addToCart(id, item, date) {
    let data = [id, item.product_name, 1, item.product_price, item.product_img, item.product_vkus, item.product_desc, date, 0, item.massa];
    console.log(data);
    return this.database.executeSql("INSERT INTO cart (id, product_name, count, product_price, product_img, product_vkus, product_desc, date, sklad_count, massa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", data).then(res => {
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
  getAllCart(){
    let products = [];
    return this.database.executeSql("SELECT * FROM cart", []).then(res => {
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
              products.push({
                id: res.rows.item(i).id,
                product_name: res.rows.item(i).product_name,
                product_price: res.rows.item(i).product_price,
                product_img: res.rows.item(i).product_img,
                product_desc: res.rows.item(i).product_desc,
                product_vkus: res.rows.item(i).product_vkus,
                count: res.rows.item(i).count,
                date: res.rows.item(i).date,
                sklad_count: res.rows.item(i).sklad_count,
                massa: res.rows.item(i).massa
              })
          }
        }
      return products;
    })
  }
  async deleteItemFromCart(id) {
    this.database.executeSql("DELETE FROM cart WHERE id = ?", [id]).then(res => {
      this.getItemCount();
      return this.getAllCart();
    })
  }

  clearCart(){
    return this.database.executeSql("DELETE FROM cart").then(res => {
      localStorage.setItem("cart-item-count", String(0));
    })
  }

  getAllCartAtStart() {
    let products = [];
    return this.database.executeSql("SELECT * FROM cart", []).then(res => {
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          let id = res.rows.item(i).id;
          let url = "http://iron.controlsoft.kz/mobile-app.php?action=getSkladCount&id=" + id;
          this.http.get(url).subscribe(data => {
            this.request = data;
            this.request = JSON.parse(this.request._body);
            let count = this.request.count;
            let count_at_cart = res.rows.item(i).count;
            if(count_at_cart > count){
              let all_count = Number(localStorage.getItem("cart-item-count"));
              all_count = Number(all_count) - Number(count_at_cart) + Number(count);
              localStorage.setItem("cart-item-count", String(all_count));
              count_at_cart = count;
              let sql = "UPDATE cart SET `count` = ? WHERE id = ?";
              this.database.executeSql(sql, [count, id]).then(() => {
                console.log("ok");
              })
            }
            let sql = "UPDATE cart SET `sklad_count` = ? WHERE id = ?";
            console.log('COUNT = ' + count + ' id = ' + id);
            this.database.executeSql(sql, [Number(count), id]).then(() => {
              products.push({
                id: res.rows.item(i).id,
                product_name: res.rows.item(i).product_name,
                product_price: res.rows.item(i).product_price,
                product_img: res.rows.item(i).product_img,
                product_desc: res.rows.item(i).product_desc,
                product_vkus: res.rows.item(i).product_vkus,
                count: count_at_cart,
                date: res.rows.item(i).date,
                sklad_count: count,
                massa: res.rows.item(i).massa
              })
            })
          })
        }
      }
      this.getItemCount();
      return products;
    })
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }

  getItemCount() {
    this.database.executeSql("SELECT * FROM cart", []).then(res => {
      let count = 0;
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          count = Number(count) + Number(res.rows.item(i).count);
        }
      }
      localStorage.setItem("cart-item-count", String(count));
      return count;
    }, err => {
      return 0;
    });
  }

  updateProductCount(statement, id, count) {
    if (statement == "+") {
      let sql = "UPDATE cart SET count = ? WHERE id = ?";
      this.database.executeSql(sql, [count, id]).then(() => {
        this.getItemCount();
      });
    }
    else if (statement == "-") {
      let sql = "UPDATE cart SET count = ? WHERE id = ?";
      this.database.executeSql(sql, [count, id]).then(() => {
        this.getItemCount();
      })
    }
  }

}
