import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { DataService } from 'src/app/services/data.service';
import { PeopleService } from 'src/app/services/people.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage  implements OnInit  {

  public datas2;
  public users: any
  public user2: any;
  constructor(private _router: Router, private _AccountService: AccountService,  private dataService: DataService, private _connection: PeopleService, private _notificationService: NotificationService, ) { }

  ngOnInit() {

    this.GetAllMyConnection();
    //this.getAllUsers();

    //this.Run();

  }

  OnConnectClick(id: string, image: string, name:string)
  {
  
    window.localStorage.setItem("_contactName", name);
    window.localStorage.setItem("_contactId", id);
    window.localStorage.setItem("_contactImage", image);
    console.log("contact id : " + id);
  }

   GetAllMyConnection() 
  {
    return this._connection.GetMyConnection(window.localStorage.getItem("_user1")).subscribe((data) => {
      this.users = data;
      
      this.runspiner();
    });
  }

  getAllUsers() {
    return this._AccountService.GetAllLogedUsers().subscribe(data2 => {
      this.user2 = data2;
    })
  }


  //spinner
  runspiner() {

    //document.getElementById("myspiner3").remove();
    // this.spinType = 'indeterminate';
  }

  ClickConnect(id: string) {
    var element = document.getElementById(id)
    element.setAttribute("style", "color:green; text-transform: capitalize;");
    element.innerText = "request sent";

    this._connection.PostConnectionRequest(localStorage.getItem("_user1"), id).subscribe(resposne => {
      //alert("post connectrion request : " + resposne);
    },
      error => alert(error))
    // alert(id);
  }

  OnUplodImgagClick(inputValue: string): void {
    if (inputValue != undefined)
     {
      this.GetUserInfoB(inputValue);
      window.sessionStorage.clear();
      window.sessionStorage.setItem('key', inputValue)
      //this._router.navigateByUrl('/home(Chatmessage:messagecomppath)');

      var CurreintUrl = this._router.url;
      // alert("current url: " + CurreintUrl);

      this._notificationService.putMessageNotificatisonIsCheckedTrue(window.localStorage.getItem("_user1"),"_accessvalue").subscribe();
   
      var mydoc = document.getElementById(inputValue+100);
      mydoc.setAttribute("style","background-color: lightgray; border: 1px solid lightgray;");

      var navigationsURLs: string[] = ['/home', '/notification', '/people', '/upload','/notification_messaging'];

      if (CurreintUrl == navigationsURLs[0]) {
        this._router.navigateByUrl('/home(Chatmessage:messagecomppath)');
      }
      else if (CurreintUrl == navigationsURLs[1]) {
        this._router.navigateByUrl('/notification(Chatmessage:messagecomppath)');
      }
      else if (CurreintUrl == navigationsURLs[2]) {
        this._router.navigateByUrl('/people(Chatmessage:messagecomppath)');
      }
      else if (CurreintUrl == navigationsURLs[3]) {
        this._router.navigateByUrl('/upload(Chatmessage:messagecomppath)');
      }
      else if (CurreintUrl == navigationsURLs[4]) {
        this._router.navigateByUrl('/notification_messaging(Chatmessage:messagecomppath)');
      }


    }
  }
  newMessage(newNmae: string[]) {
    this.dataService.ChangeSourceReciver(newNmae)
  }

  //return user info by its Id
  GetUserInfoB(userId: string): any {
    return this._AccountService.S_GetUserInfoByID(userId).subscribe((data) => {


      if (data != undefined) {
        //reciver name
        var infs: string[] = [data.profileImageURL, data.userName]
        this.newMessage(infs);


      }
    });
  }

 


  Run() {
    var timeIntevalSeconds = 1;
    setInterval(() => {
      
      // this.ChangeOnfflineColor();
      // this.ChangeOnlineColor();

    }, timeIntevalSeconds * 25000);

    return 1;

  }

  // ChangeOnlineColor() {

  //   return this._online.GetOnlineRefIds().subscribe((data) => {

  //     for (var i = 0; i < data.length; i++) {
  //      // alert(data);
  //       var ele = document.getElementById(data[i] + 1);
  //       // ele.setAttribute("style", "border: 4px solid  #33cc33");
  //      // alert(ele.innerHTML);

  //     }
  //   });
  // }




  // ChangeOnfflineColor() {

  //   return this._online.GetOfflineRefIds().subscribe((data) => {

  //     for (var i = 0; i < data.length; i++) {
       
  //       var ele = document.getElementById(data[i] + 1);
  //       // ele.setAttribute("style", "border: 4px solid red");
  //      // alert(ele.innerHTML);

  //     }
  //   });
  // }



}
