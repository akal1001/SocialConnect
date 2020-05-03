import { Component, OnInit } from "@angular/core";
import { IUser } from "src/app/interfaces/iuser";
import { AccountService } from "src/app/services/account.service";

import { Router } from "@angular/router";
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: "app-myconnections",
  templateUrl: "./myconnections.page.html",
  styleUrls: ["./myconnections.page.scss"],
})
export class MyconnectionsPage implements OnInit {
  public users: IUser;
  constructor(
    private _AccountService: AccountService,
    private _connectionService:ConnectionService,
    private _connection: ConnectionService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.GetAllMyConnection();
  }

  doRefresh(event) {
    console.log("Begin async operation");
    this.GetAllMyConnection();
    setTimeout(() => {
      console.log("Async operation has ended");
      event.target.complete();
    }, 2000);
  }

 

  GetAllMyConnection() {
    return this._connection
      .GetMyConnection(window.localStorage.getItem("_user1"))
      .subscribe((data) => {
        document.getElementById("myconnectionspinner").remove();
        this.users = data;
      });
  }

  ClickConnect(id: string) {
    var element = document.getElementById(id);
    element.setAttribute("style", "color:green; text-transform: capitalize;");
    element.innerText = "request sent";

    this._connection
      .PostConnectionRequest(localStorage.getItem("_user1"), id)
      .subscribe(
        (resposne) => {
          //alert("post connectrion request : " + resposne);
        },
        (error) => alert(error)
      );
    // alert(id);
  }
  //**NOt tested */
  RemoveConnection(friendId)
  {
      this._connectionService.DropConnectionRequest(localStorage.getItem("_user1"), friendId).subscribe((data)=>
      {
         if(data==true)
         {
           console.log("is user delete : " + data)
            document.getElementById(friendId).remove();
         }
      },
      error => 
      {
        console.log("Error occured on removing connection : " + error)
      })
  }
}
