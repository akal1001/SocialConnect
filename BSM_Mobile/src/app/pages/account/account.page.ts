import { Component, OnInit } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AccountService } from 'src/app/services/account.service';
import { IUser } from 'src/app/interfaces/iuser';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  myName:string="";
  myId:string = "";
  profileImageUrl:string = "";
  users:IUser;
  constructor(private _account:AccountService, private _router:Router, private menu: MenuController, private nativeStorage: NativeStorage
 ) { }

  ngOnInit() {
    this.nativeStorage.getItem("_ucr").then(
      (response) => {
        this.myId = response._userId;
        this.profileImageUrl = response._pI1;
        this.myName = response._username;
        console.log("myname :" + this.myName+ "\nmyId : " + this.myId + " \nProfile image Url" +this.profileImageUrl);
      },
      (error) => {
        console.log("error geting data from nativeStorage" + error);
      }
    );
    console.log("aaa")
    this.getAllUser();
  }
  logout()
  {
    this.nativeStorage.clear();
    this.myName= "";
    this.myId = "";
    this.profileImageUrl = "";
    this._router.navigateByUrl("/login")
  }
  goToMyProfile()
  {

    this.nativeStorage.getItem("_ucr").then(
      (response) => {

        this.myId = response._userId;
        this.profileImageUrl = response._pI1;
        this.myName = response._username;
        console.log("myname :" + this.myName+ "\nmyId : " + this.myId + " \nProfile image Url" +this.profileImageUrl);
        let routerLink = "/my-profile/"+this.myId;
        this._router.navigateByUrl(routerLink)
      },
      (error) => {
        console.log("error geting data from nativeStorage" + error);
      }
    );
  }

  getAllUser() {
    this.nativeStorage.getItem("_ucr").then((data: { _userId: string; })=>{
      return this._account.ReturnAllUsers(data._userId).subscribe((data: IUser) => {
        this.users = data;
       
      });
    },error=>console.log("erro native native localStorage" + error))
    
  }
}
