import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectionsenderPage } from './connectionsender.page';

const routes: Routes = [
  {
    path: '',
    component: ConnectionsenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectionsenderPageRoutingModule {}
