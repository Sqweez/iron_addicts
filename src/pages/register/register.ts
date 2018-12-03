import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, Platform} from 'ionic-angular';
import * as $ from "jquery"
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import swal from 'sweetalert';
import {HomePage} from "../home/home";
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  data: any = {
    'phone': "",
    "fio": "",
    "confirmCode": ""
  };

  constructor(public platform: Platform, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams) {
    this.menuCtrl.enable(false);
  }

  ionViewDidEnter() {
    this.handler();
  }
  handler(){
    this.platform.registerBackButtonAction(function () {
      this.navCtrl.setRoot(HomePage);
    })
  }
  getCode(data){
    if(!data.confirmCode){
      let element = $('#registerButton');
      let code = $('#confirmCode');
      $(".registerInput").css("display", "none");
      code.css("display", "flex");
      element.text("РЕГИСТРАЦИЯ");
    }
    else{
      swal("Вы зарегистрированы!", "", "success").then(() => {
        this.menuCtrl.enable(true);
        this.navCtrl.setRoot(HomePage);
      });
    }
  }

}
