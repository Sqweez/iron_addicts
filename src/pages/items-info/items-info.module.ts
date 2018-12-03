import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemsInfoPage } from './items-info';

@NgModule({
  declarations: [
    ItemsInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemsInfoPage),
  ],
})
export class ItemsInfoPageModule {}
