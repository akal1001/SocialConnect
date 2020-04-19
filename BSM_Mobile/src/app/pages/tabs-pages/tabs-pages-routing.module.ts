import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPagesPage } from './tabs-pages.page';

const routes: Routes = [
  {
    path: 'tabs',
    component:TabsPagesPage,
    children: [
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
        path: 'post',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../post/post.module').then(m => m.PostPageModule)
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
         path: '',
         redirectTo: '/tabs/home',
         pathMatch: 'full'
       }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPagesPageRoutingModule {}
