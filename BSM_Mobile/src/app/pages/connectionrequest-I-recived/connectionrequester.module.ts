import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnectionrequesterPageRoutingModule } from './connectionrequester-routing.module';

import { ConnectionrequesterPage } from './connectionrequester.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnectionrequesterPageRoutingModule
  ],
  declarations: [ConnectionrequesterPage]
})
export class ConnectionrequesterPageModule {}
