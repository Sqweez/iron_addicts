import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MakeOrderPage } from './make-order';

@NgModule({
  declarations: [
    MakeOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(MakeOrderPage),
  ],
})
export class MakeOrderPageModule {}
