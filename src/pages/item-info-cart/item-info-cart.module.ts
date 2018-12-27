import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemInfoCartPage } from './item-info-cart';

@NgModule({
  declarations: [
    ItemInfoCartPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemInfoCartPage),
  ],
})
export class ItemInfoCartPageModule {}
