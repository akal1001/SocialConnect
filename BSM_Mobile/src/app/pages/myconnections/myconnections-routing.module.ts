import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyconnectionsPage } from './myconnections.page';

const routes: Routes = [
  {
    path: '',
    component: MyconnectionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyconnectionsPageRoutingModule {}
