import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";

//import { AngularFireModule } from "angularfire2";
import { AngularFireStorage } from "angularfire2/storage";
import { Keyboard } from "@ionic-native/keyboard/ngx";
import { NativeStorage } from "@ionic-native/native-storage/ngx";

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'; 
import { Firebase } from '@ionic-native/firebase/ngx';

const config = {
  apiKey: "AIzaSyAsB6NO7QvN-DCV-tycqx9szfmuojEjmtE",
  authDomain: "bsmm-2016e.firebaseapp.com",
  databaseURL: "https://bsmm-2016e.firebaseio.com",
  projectId: "bsmm-2016e",
  storageBucket: "bsmm-2016e.appspot.com",
  messagingSenderId: "545983473559",
  appId: "1:545983473559:web:3ebb733ff19975574e86d2",
  measurementId: "G-BCN5LCWF0Z"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAsB6NO7QvN-DCV-tycqx9szfmuojEjmtE",
      authDomain: "<your-auth-domain>",
      storageBucket: "gs://bsmm-2016e.appspot.com/",
      projectId: "<bsmm-2016e",config
    }),
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireStorage,
    NativeStorage,
    Firebase,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Keyboard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
