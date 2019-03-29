import {Component} from '@angular/core';
import {Events, IonicPage, MenuController, NavController, NavParams, Platform} from 'ionic-angular';
import * as $ from "jquery"
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import swal from 'sweetalert';
import {HomePage} from "../home/home";
import {Http} from "@angular/http";
import {MyProfilePage} from "../my-profile/my-profile";
import {MyApp} from "../../app/app.component";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  requestData: any;
  confirmCode;
  push;
  data: any = {
    'phone': "",
    "fio": "",
    "confirmCode": ""
  };

  constructor(public events: Events, public http: Http, public platform: Platform, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams) {
    this.menuCtrl.enable(false);
  }

  ionViewDidEnter() {
    this.handler();
  }

  handler() {
    this.platform.registerBackButtonAction(function () {
      this.navCtrl.setRoot(HomePage);
    })
  }

  getCode(data) {
    if (!data.confirmCode) {
      if (data.phone.length < 11) {
        swal("", "Введите 11-значный номер телефона", "error");
        $("#phone").val('');
        data.phone = "";
      }
      else {
        data.phone = "+7" + data.phone.slice(1);
        console.log(data.phone);
        data.fio = data.fio.split(" ");
        for(let i = 0; i < data.fio.length; i++){
          data.fio[i] = data.fio[i].charAt(0).toUpperCase() + data.fio[i].slice(1);
        }
        data.fio = data.fio.join(" ");
        console.log(data.fio);
        let url = "http://ironaddicts.kz/admin/mobile-app.php";
        let confirmCode = Math.floor(Math.random()*(9999-1000+1)+1000);
        let postData = new FormData();
        postData.append("action", "auth");
        let push = localStorage.getItem("push");
        postData.append("push", push);
        postData.append("phone", data.phone);
        postData.append("name", data.fio);
        postData.append("code", String(confirmCode));
        let requestData = this.http.post(url, postData);
        requestData.subscribe(res => {
          this.requestData = res;
          let userData = JSON.parse(this.requestData._body);
          this.confirmCode = userData[0].code;
          this.http.get('https://api.mobizon.kz/service/message/sendsmsmessage?recipient=' + data.phone + '&text=Код потверждения: '+ this.confirmCode +'&apiKey=kz4f23285577ca032ca69150a6fd7378d04a8da887e3e6dc06393bdbfa446185e0d961').subscribe(data => {
            console.log(data);
          })
        });
        let element = $('#registerButton');
        let code = $('#confirmCode');
        $(".registerInput").css("display", "none");
        code.css("display", "flex");
        element.text("РЕГИСТРАЦИЯ");
      }
    }
    else {
      if(this.confirmCode == this.data.confirmCode){
        swal("Вы зарегистрированы!", "", "success").then(() => {
          let userData = JSON.parse(this.requestData._body);
          localStorage.setItem("user_name", userData[0].name);
          localStorage.setItem("balans", userData[0].balance);
          localStorage.setItem("user_id", userData[0].user_id);
          localStorage.setItem("phone", data.phone);
          localStorage.setItem("isTrener", userData[0].isTrener);
          this.menuCtrl.enable(true);
          this.events.publish('user:loggedin');
          this.navCtrl.setRoot(MyApp);
        });
      }
      else{
        swal("", "Код с SMS не верен", "error");
        data.confirmCode = "";
      }
    }
  }

}
