import { Component, OnInit } from "@angular/core";
import { IUser } from "src/app/interfaces/iuser";
import { AccountService } from "src/app/services/account.service";
import { Router } from "@angular/router";
import { ConnectionService } from "src/app/services/connection.service";
import { NativeStorage } from "@ionic-native/native-storage/ngx";

@Component({
  selector: "app-people",
  templateUrl: "./people.page.html",
  styleUrls: ["./people.page.scss"],
})
export class PeoplePage  implements OnInit{

  public users: IUser;
  public myId: string = "";
  constructor(
    private _account: AccountService,
    private _connection: ConnectionService,
    private _router: Router,
    private nativeStorage: NativeStorage
  ) {}
  ngOnInit() {
    this.nativeStorage.getItem("_ucr").then(
      (response) => {
        this.myId = response._userId;
       
      },
      (error) => {
        console.log("error geting data from nativeStorage" + error);
      }
    );
    this.getAllUser()
  }
  ionViewWillEnter() {
   
  }

  getAllUser() {
    this.nativeStorage.getItem("_ucr").then((data)=>{
      return this._account.ReturnAllUsers(data._userId).subscribe((data) => {
        this.users = data;
      });
    },error=>console.log("erro native native localStorage" + error))
    
  }

  SendConnectionRequest(id: string) {
    this._connection.PostConnectionRequest(this.myId, id).subscribe(
      (resposne) => {
        if (resposne == true) {
          document.getElementById(id).remove();
        }
      },
      (error) => alert(error)
    );
    // alert(id);
  }

  thisUserInfo(id: string) {
    //window.localStorage.setItem("_user2", id);
    console.log("thisUserInfo id " + id)
    this.nativeStorage.setItem("_user2", id);
    this._router.navigate(["/profile/"+ id]);
  }


 
}
