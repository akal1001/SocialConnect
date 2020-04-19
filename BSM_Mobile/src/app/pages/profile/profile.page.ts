import { Component, OnInit } from '@angular/core';

import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor( private _accountService: AccountService) {
    
  }

  ngOnInit() {

    this.GetThisUserInfo1();
    // this. IsUserAutenicated();
  }
 


  public profile:any;
  GetThisUserInfo1() {
  
  
    var r = window.localStorage.getItem("_user2");

   
    return this._accountService.GetUserPublicProfileInfo(r).subscribe((resposne) => {
      
      this.profile = resposne;
      console.log("this userInfo: " + resposne);
    });
  }

}
