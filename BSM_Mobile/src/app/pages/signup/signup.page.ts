import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { IUser } from 'src/app/interfaces/iuser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signup: IUser = { username: '', userpassword: '', useremail:'' };
 
  submitted = false;

  public results: string;
  message = "";
  constructor(private _accountService: AccountService) {
  }

  ngOnInit() {
    //this.users.username = '';
    //this.users.userpassword = '';
    //this.users.useremail = ''
  }

  userSignup() {
    document.getElementById("mysponer").style.display="inline"
   
    this._accountService.postNewUserService(this.signup.username, this.signup.userpassword, this.signup.useremail).subscribe((data) => 
    {
      var respnse = data;
    
      console.log("respone data : " + data);
      if (respnse == true) {
        document.getElementById("mysponer").remove();
          this.message ="registration successful"
      }
      if (respnse == false) {
        document.getElementById("mysponer").style.display="none"
         this.message ="registration NOT successful!"
      }
    },
      errror => console.log(errror)
    );
  }

}
