import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/iuser';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { ConnectionService } from 'src/app/services/connection.service';


@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage {

  public users:IUser;
  constructor(private _account:AccountService, private _connection:ConnectionService, private _router:Router) { }

  ionViewWillEnter() 
  
  {
    if(window.localStorage.getItem("_user1")!= undefined)
    {
      this.getAllUser();
    }
    else{
      this._router.navigate(['account']);
    }
  }

   getAllUser()
   {
    return  this._account.ReturnAllUsers(window.localStorage.getItem("_user1")).subscribe((data)=>{
      this.users  = data;
     
     })
   }
 
 
   SendConnectionRequest(id: string) {
    this._connection
      .PostConnectionRequest(localStorage.getItem("_user1"), id)
      .subscribe(
        (resposne) => 
        {
           if(resposne == true)
           {
             document.getElementById(id).remove()
           }
        },
        (error) => alert(error)
      );
    // alert(id);
  }


  thisUserInfo(id: string) {
    window.localStorage.setItem("_user2", id);
    this._router.navigate(['/publicpro']);
  }

}
