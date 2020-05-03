import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { AccountService } from "src/app/services/account.service";
import { Router } from "@angular/router";
import { IUser } from "src/app/interfaces/iuser";
import { NavController } from '@ionic/angular';

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
    private _router: Router,public navCtrl: NavController
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
              window.localStorage.clear();
              window.localStorage.setItem("_user1", data[1]);
              window.localStorage.setItem("_name", this.login.username);
              window.localStorage.setItem("_pI1", data[2]);
  
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
}
