import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyconnectionsPageRoutingModule } from './myconnections-routing.module';

import { MyconnectionsPage } from './myconnections.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyconnectionsPageRoutingModule
  ],
  declarations: [MyconnectionsPage]
})
export class MyconnectionsPageModule {}
