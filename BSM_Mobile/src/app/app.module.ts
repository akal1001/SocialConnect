import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import {AngularFireStorage} from 'angularfire2/storage';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule,IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp({
    apiKey: "AIzaSyDav-Ub8sGOrejhRBDsPkMiUz4nQS8-rQE",
    authDomain: "<your-auth-domain>",
    storageBucket: "gs://tst20-f7702.appspot.com/",
    projectId: "<tst20-f7702",
  })],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireStorage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
