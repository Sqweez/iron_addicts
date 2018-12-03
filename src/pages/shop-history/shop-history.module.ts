import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopHistoryPage } from './shop-history';

@NgModule({
  declarations: [
    ShopHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopHistoryPage),
  ],
})
export class ShopHistoryPageModule {}
