import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPagesPage } from './tabs-pages.page';

const routes: Routes = [
  {
    path: 'tabs',
    component:TabsPagesPage,
    children: [
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../login/login.module').then(m => m.LoginPageModule)
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../account/account.module').then(m => m.AccountPageModule)
          }
        ]
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
       
        path: 'people',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../people/people.module').then(m => m.PeoplePageModule)
          }
        ]
      },
      {
        
        path: 'notification',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../notification/notification.module').then(m => m.NotificationPageModule)
          }
        ]
      },
      {
         path: '',
         redirectTo: '/home',
         pathMatch: 'full'
       }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPagesPageRoutingModule {}
