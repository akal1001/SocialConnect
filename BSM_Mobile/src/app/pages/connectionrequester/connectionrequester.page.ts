import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { PeopleService } from 'src/app/services/people.service';
import { IUser } from 'src/app/interfaces/iuser';

@Component({
  selector: 'app-connectionrequester',
  templateUrl: './connectionrequester.page.html',
  styleUrls: ['./connectionrequester.page.scss'],
})
export class ConnectionrequesterPage implements OnInit {

  public users: IUser;
  constructor(private _account: AccountService, private _connection: PeopleService) { }

  ngOnInit() {

    this.GetAllMyConnection();
  }
  //return all my connection request
  GetAllMyConnection() {
    return this._connection.GetMyConnectionRequest(window.localStorage.getItem("_user1")).subscribe((data) => {
      this.users = data;
      this.runspiner();
    });
  }
  //spinner
  runspiner() {

    //document.getElementById("myspiner3").remove();
    // this.spinType = 'indeterminate';
  }
  RemoveConnectConnectRequest(id: string) {
    var element = document.getElementById(id + 19);

    this._connection.DeleteThisConnectionService(localStorage.getItem("_user1"), id).subscribe(resposne => {
      if (resposne == true) {
        element.remove();
      }
    },
      error => alert(error))

  }

  AcceptConnectRequest(id: string) {
    //alert(id);
    var element = document.getElementById(id + 19)

    element.remove();

    this._connection.AcceptConnectionRequestService(window.localStorage.getItem("_user1"), id).subscribe((data) => {
      //alert(data);
    });

    // this._connection.PostConnectionRequest(localStorage.getItem(localStorage.key(0)),id).subscribe(resposne=>
    // {
    //   //alert("post connectrion request : " + resposne);
    // },
    // error => alert(error))
    // alert(id);
  }


}
