import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/iuser';
import { AccountService } from 'src/app/services/account.service';
import { PeopleService } from 'src/app/services/people.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myconnections',
  templateUrl: './myconnections.page.html',
  styleUrls: ['./myconnections.page.scss'],
})
export class MyconnectionsPage implements OnInit {

  public users:IUser;
  constructor(private _AccountService: AccountService,  private _connection:PeopleService, private _router:Router) { }

  ngOnInit()  
  {
    this.IsUserAutenicated();    
  }

  IsUserAutenicated() {
    this._AccountService.IsUserAuthenticatedService(window.localStorage.getItem("_user1")).subscribe((resposne) => {
      if (resposne == true) {

        this.GetAllMyConnection();
      }
      else {

        this._router.navigate(['account']);
       

      }
    })

  }
  


  GetAllMyConnection()
   {
    return  this._connection.GetMyConnection(window.localStorage.getItem("_user1")).subscribe((data)=>{
      this.users  = data;
      this.runspiner();
     });
   }
 
 

   //spinner
   runspiner() {

    document.getElementById("myspiner3").remove();
    // this.spinType = 'indeterminate';
  }

  ClickConnect(id:string)
  {
    var element = document.getElementById(id)
    element.setAttribute("style","color:green; text-transform: capitalize;");
    element.innerText = "request sent";

    this._connection.PostConnectionRequest(localStorage.getItem("_user1"),id).subscribe(resposne=>
    {
      //alert("post connectrion request : " + resposne);
    },
    error => alert(error))
   // alert(id);
  }

}
