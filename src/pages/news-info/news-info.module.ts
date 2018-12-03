import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsInfoPage } from './news-info';

@NgModule({
  declarations: [
    NewsInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsInfoPage),
  ],
})
export class NewsInfoPageModule {}
