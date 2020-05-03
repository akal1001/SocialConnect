import { Component, OnInit } from "@angular/core";
import { IUser } from "src/app/interfaces/iuser";
import { ConnectionService } from "src/app/services/connection.service";

@Component({
  selector: "app-connectionrequester",
  templateUrl: "./connectionrequester.page.html",
  styleUrls: ["./connectionrequester.page.scss"],
})
export class ConnectionrequesterPage implements OnInit {
  public users: IUser;
  constructor(private _connection: ConnectionService) {}

  ngOnInit() {
    this.GetMyConnectionRequsters();
  }

  //return all my connection request
  GetMyConnectionRequsters() {
    return this._connection
      .GetConnectionRequestsSend_ToMe(window.localStorage.getItem("_user1"))
      .subscribe((data) => {
        this.users = data;
      });
  }

  RemoveConnectConnectRequest(id: string) {
    this._connection
      .DropConnectionRequest(id, localStorage.getItem("_user1"))
      .subscribe(
        (resposne) => {
          if (resposne == true) {
            document.getElementById(id).remove();
            console.log(resposne);
          }
        },
        (error) => alert(error)
      );
  }

  AcceptConnectRequest(id: string) {
    //alert(id);
    var element = document.getElementById(id);

    //element.remove();

    this._connection
      .AcceptConnectionRequestService(window.localStorage.getItem("_user1"), id)
      .subscribe(
        (resposne) => {
          console.log("Request acceptance response : " + resposne);
        },
        (error) => {
          console.log("Error occureed : " + error);
        }
      );
  }
}
