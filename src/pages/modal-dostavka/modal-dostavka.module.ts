import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalDostavkaPage } from './modal-dostavka';

@NgModule({
  declarations: [
    ModalDostavkaPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalDostavkaPage),
  ],
})
export class ModalDostavkaPageModule {}
