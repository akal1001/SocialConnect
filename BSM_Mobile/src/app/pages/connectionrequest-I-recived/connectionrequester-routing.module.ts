import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectionrequesterPage } from './connectionrequester.page';

const routes: Routes = [
  {
    path: '',
    component: ConnectionrequesterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectionrequesterPageRoutingModule {}
