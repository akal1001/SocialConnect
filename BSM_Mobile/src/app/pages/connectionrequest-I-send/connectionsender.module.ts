import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnectionsenderPageRoutingModule } from './connectionsender-routing.module';

import { ConnectionsenderPage } from './connectionsender.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnectionsenderPageRoutingModule
  ],
  declarations: [ConnectionsenderPage]
})
export class ConnectionsenderPageModule {}
