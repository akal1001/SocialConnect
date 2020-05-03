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
   
  }

  
  userSignup() 
  {
    let mylblmessage = document.getElementById("lblMessage")
    let mysignupspiner = document.getElementById("mysignupspiner")
    if(this.signup.username == "" || this.signup.userpassword == "" || this.signup.useremail== "")
    {
      this.submitted = true;
    }
    else
    {
      mysignupspiner.style.display="inline"
      
        this._accountService.postNewUserService(this.signup.username, this.signup.userpassword, this.signup.useremail).subscribe((data) => 
        {
          var respnse = data;
        
          console.log("respone data : " + data);
          if (respnse == true) {
            mysignupspiner.style.display="none"
              mylblmessage.style.color = "green"
              this.message ="your registration is successful"
          }
          if (respnse == false) {
            mysignupspiner.style.display="none"
            mylblmessage.style.color = "red"
            this.message ="registration NOT successful!"
          }
        },
          errror => console.log(errror)
        );
      }
  }
}
