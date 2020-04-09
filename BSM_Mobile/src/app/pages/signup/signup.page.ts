import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  userid?: any;
  username: any;
  useremail?: any;
  userpassword?: any;
  _Date?: string;


  public results: string;

  constructor(private _accountService: AccountService) {
  }

  ngOnInit() {
    //this.users.username = '';
    //this.users.userpassword = '';
    //this.users.useremail = ''
  }

  userSignup(rigfrom: NgForm) {
    var docs = document.getElementById("regResult");
   
    this._accountService.postNewUserService(rigfrom.value.username, rigfrom.value.userpassword, rigfrom.value.useremail).subscribe((data) => 
    {
      var respnse = data;
    
      console.log("respone data : " + data);
      if (respnse == true) {
     
        docs.innerHTML="";
        docs.setAttribute("style", "color:green");
        docs.setAttribute("stryle", "text-align: center");
        docs.setAttribute("stryle", "font-weight: lighter");
        
        docs.innerHTML = "registration successful";
       // this.results = " registration successful";
       // alert("yes");
      }
      if (respnse == false) {

        docs.innerHTML="";
        docs.setAttribute("style", "color:red");
        docs.setAttribute("stryle", "text-align: center");
        docs.setAttribute("stryle", "font-weight: lighter");
        docs.innerHTML = " registration NOT successful, please try again!!";
      }
    },
      errror => console.log(errror)
    );
  }

}
