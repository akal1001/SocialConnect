import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPagesPageRoutingModule } from './tabs-pages-routing.module';

import { TabsPagesPage } from './tabs-pages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPagesPageRoutingModule
  ],
  declarations: [TabsPagesPage]
})
export class TabsPagesPageModule {}
