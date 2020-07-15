import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { AccountService } from "src/app/services/account.service";
import { Router } from "@angular/router";
import { IUser } from "src/app/interfaces/iuser";
import { NavController } from '@ionic/angular';
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { FcmService } from 'src/app/services/fcm.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  public message = "";
  public myData: string[];
  public submitted = false;

  login: IUser = { username: "", userpassword: "" };

  //to pass loged user info to the parent component
  @Output()
  public userInfoEventEmiter = new EventEmitter();

  constructor(
    private _accountService: AccountService,
    private _router: Router,public navCtrl: NavController, private nativeStorage: NativeStorage, private fcm:FcmService
  ) {}

  ngOnInit() {
    window.localStorage.clear();
  }

  userLogin(): void 
  {
   
    if(this.login.username == "" || this.login.userpassword == "")
    {
      this.submitted = true;
    }
    else
    {
      this.message = "";
      document.getElementById("myloginspiner").style.display="inline"
      this._accountService
        .getUserLoginServe(this.login.username, this.login.userpassword)
  
        .subscribe(
          (data) => 
          {
            if (data != null) 
            {
              this.message =null;
              document.getElementById("myloginspiner").style.display="none"
              this.nativeStorage
              .setItem("_ucr", {
                _username: this.login.username,
                _userId:data[1],
                _pI1: data[2]
              
              })
              .then(
                () => {
                  console.log("creditional stored to nativeStorage");
                  //this.TokenRegester(data[1]);
                },
                (error) => {
                  console.error("Error nativeStorage !", error);
                }
              );

              this._router.navigateByUrl("/tabs/home");
              
            } else {
              document.getElementById("myloginspiner").style.display="none"
              this.message = "username or password incorrect!";
            }
          },
          (error) => console.log("error", error)
        );
    }
    
  }
  onSignup() {
    this._router.navigateByUrl("/signup")
  }


  //regester or update token for push
  private TokenRegester(myId:any)
  {
    this.fcm.getToken().then(data=>{
      console.log("Token : " + data +"\n my Id" + myId);
      //same api to regester 

 alert(data + ".........." + myId);
    },
    error=>{console.log("get token error: " + error)})
  }
}
