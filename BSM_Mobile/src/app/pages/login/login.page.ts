import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { NgForm } from '@angular/forms';
import { ProfileImageService } from 'src/app/services/profile-image.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userid?: any;
  username: any;
  useremail?: any;
  userpassword?: any;
  _Date?: string;

  //custom data
  public myData: string[];
  public _key = "";

  //to pass loged user info to the parent component
  @Output()
  public userInfoEventEmiter = new EventEmitter();

  constructor(private _accountService: AccountService, private _proImagSrveice: ProfileImageService, private _router: Router, private dataService: DataService) { }

  ngOnInit() {
    window.localStorage.clear();
  
  }

  newMessage(newNmae: string) {
   // this.dataService.changeMessage(newNmae)
  }
  //User login info stored In LOCAL Storage
  userLogin(userForm: NgForm): void {


    //let user:users = new users("akal");
    //user.FulName("1");
    
   // alert(": " + result);
   
    console.log(userForm.value.username + "  : " + userForm.value.userpassword);
    //call login service 
    this._accountService.getUserLoginServe(userForm.value.username, userForm.value.userpassword)

      .subscribe((data) => {
        if (data != null) {
         
         
          window.localStorage.setItem("_user1", data[1]);
          window.localStorage.setItem("_name", userForm.value.username);
         window.localStorage.setItem("_pI1", data[2]);
         
        
         // this.getthisProfilePicurNow();
         //this._router.navigate(['home']);
        //window.location.replace('http://localhost:4200/home')
        // window.location.replace('https://testmsg-59a24.firebaseapp.com/home')
        this._router.navigateByUrl('/tabs/home');
        }
        else {
          var docs = document.getElementById("signResult");
          docs.innerHTML = "";
          docs.setAttribute("style", "color:red");
          docs.setAttribute("stryle", "text-align: center");
          docs.setAttribute("stryle", "font-weight: lighter");
          docs.innerHTML = " username or password incorrect!!";
          //this._key = "username or password incorrect!";
        }

      },
        error => console.log('error', error)
      );
  }

  getValueFromLocalStoragte() {
    this._key = window.localStorage.key(0)
    //this._key = useId;
    //console.log(this._key);

  }
  SetCookie(userId: string, userImageURL: string) {



    // console.log("Cookis data : " + v.valueOf();
  }

}
