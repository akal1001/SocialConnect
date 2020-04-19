import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/iuser';
import { AccountService } from 'src/app/services/account.service';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-connectionsender',
  templateUrl: './connectionsender.page.html',
  styleUrls: ['./connectionsender.page.scss'],
})
export class ConnectionsenderPage implements OnInit {

  public users:IUser;
  constructor(private _account:AccountService, private _connection:PeopleService) { }

  ngOnInit() 
  
  {
    
    this.GetAllMyConnection();
  }
 public conn_component_message:string;
  GetAllMyConnection()
   {
    return  this._connection.GetMyConnectionSend(window.localStorage.getItem("_user1")).subscribe((data)=>{
     
     this.conn_component_message = "con req sent by you"
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

  
  DropThisConnectRequestISend(id:string)
  {
   
    var element = document.getElementById(id + 20);

  

    this._connection.DeleteThisConnectionService(localStorage.getItem("_user1"),id).subscribe(resposne=>
    {
       if(resposne == true)
       {
        element.remove();
       }
    },
    error => alert(error))
  }


}
