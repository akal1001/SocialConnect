import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public username="";
   public userid = "";
   public UserProfile="";

 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, private _router:Router, private menu: MenuController
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    
    
    console.log("aaa")
  

  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    
    });
  }
 openFirst() {
   console.log('menu opend')
    
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  logout()
  {
    localStorage.clear();
    this.username= "";
    this.username = "";
    this.UserProfile = "";
    this._router.navigateByUrl("/login")
  }

  refersh()
  {

   
    
    this.username = localStorage.getItem("_name")
      this.UserProfile = localStorage.getItem("_pI1")
        this.userid = window.localStorage.getItem("_user1");
      let routerLink = "/my-profile/"+this.userid;
      this._router.navigateByUrl(routerLink)
  }

}
