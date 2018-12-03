import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubcategoriesPage } from './subcategories';

@NgModule({
  declarations: [
    SubcategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(SubcategoriesPage),
  ],
})
export class SubcategoriesPageModule {}
