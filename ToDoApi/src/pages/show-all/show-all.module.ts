import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowAllPage } from './show-all';

@NgModule({
  declarations: [
    ShowAllPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowAllPage),
  ],
})
export class ShowAllPageModule {}
