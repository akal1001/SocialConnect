import { Component, OnInit } from "@angular/core";

import { Platform, MenuController, ToastController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { FcmService } from "./services/fcm.service";
import { ToastService } from "./services/toast.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  myName: string = "";
  myId: string = "";
  profileImageUrl: string = "";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _router: Router,
    private menu: MenuController,
    private nativeStorage: NativeStorage,

    private fcm: FcmService,
    private toastr: ToastService,
    public toastController: ToastController
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.nativeStorage.getItem("_userCreditionals").then(
      (response) => {
        this.myId = response._userId;
        this.profileImageUrl = response._pI1;
        this.myName = response._username;
        console.log(
          "myname :" +
            this.myName +
            "\nmyId : " +
            this.myId +
            " \nProfile image Url" +
            this.profileImageUrl
        );
      },
      (error) => {
        console.log("error geting data from nativeStorage" + error);
      }
    );
    console.log("aaa");
  }

  private async presentToast(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 6000,
    });
    toast.present();
  }

  private notificationSetup() {
    this.fcm.getToken();
    this.fcm.onNotifications().subscribe((msg) => {
      if (this.platform.is("ios")) {
        this.presentToast(msg.aps.alert);
      } else {
        this.presentToast(msg.body);
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.notificationSetup();
    });
  }
  openFirst() {
    console.log("menu opend");
  }

  openEnd() {
    this.menu.open("end");
  }

  openCustom() {
    this.menu.enable(true, "custom");
    this.menu.open("custom");
  }
  logout() {
    this.nativeStorage.clear();
    this.myName = "";
    this.myId = "";
    this.profileImageUrl = "";
    this._router.navigateByUrl("/login");
  }

  refersh() {
    this.nativeStorage.getItem("_ucr").then(
      (response) => {
        this.myId = response._userId;
        this.profileImageUrl = response._pI1;
        this.myName = response._username;
        console.log(
          "myname :" +
            this.myName +
            "\nmyId : " +
            this.myId +
            " \nProfile image Url" +
            this.profileImageUrl
        );
        let routerLink = "/my-profile/" + this.myId;
        this._router.navigateByUrl(routerLink);
      },
      (error) => {
        console.log("error geting data from nativeStorage" + error);
      }
    );
  }
}
