import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/tabs-pages/tabs-pages.module').then(m => m.TabsPagesPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'myconnections',
    loadChildren: () => import('./pages/myconnections/myconnections.module').then( m => m.MyconnectionsPageModule)
  },
  {
    path: 'connectionrequester',
    loadChildren: () => import('./pages/connectionrequester/connectionrequester.module').then( m => m.ConnectionrequesterPageModule)
  },
  {
    path: 'connectionsender',
    loadChildren: () => import('./pages/connectionsender/connectionsender.module').then( m => m.ConnectionsenderPageModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./pages/contacts/contacts.module').then( m => m.ContactsPageModule)
  },
  {
    path: 'messaging',
    loadChildren: () => import('./pages/messaging/messaging.module').then( m => m.MessagingPageModule)
  },
  {
    path: 'profile/:Id',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'comments/:Id',
    loadChildren: () => import('./pages/comments/comments.module').then( m => m.CommentsPageModule)
  },
  {
    path: 'my-profile/:Id',
    loadChildren: () => import('./pages/my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  }
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
