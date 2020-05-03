import { Component, OnInit } from "@angular/core";
import { IUser } from "src/app/interfaces/iuser";
import { AccountService } from "src/app/services/account.service";

import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: "app-connectionsender",
  templateUrl: "./connectionsender.page.html",
  styleUrls: ["./connectionsender.page.scss"],
})
export class ConnectionsenderPage implements OnInit {
  public users: IUser;
  constructor(
    private _account: AccountService,
    private _connection: ConnectionService
  ) {}

  ngOnInit() {
    this.returnRqeusts_Isend();
  }



  public conn_component_message: string;
  returnRqeusts_Isend() {
    return this._connection
      .GetConnectionRequestsSend_ByMe(window.localStorage.getItem("_user1"))
      .subscribe((data) => {
        //document.getElementById("myconnectionsenderpinner").remove();
        this.conn_component_message = "con req sent by you";
        this.users = data;
      });
  }



  dropRequestISend(id: string) {
    
    this._connection
      .DropConnectionRequest(localStorage.getItem("_user1"), id)
      .subscribe(
        (resposne) => {
          if (resposne == true) {
             console.log("drop request result : " + resposne)
             document.getElementById(id).remove()
          }
        },
        (error) => alert(error)
      );
  }
}
