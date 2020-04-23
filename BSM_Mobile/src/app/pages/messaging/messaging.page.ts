import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IMessage } from 'src/app/interfaces/imessage';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MessagingService } from 'src/app/services/messaging.service';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.page.html',
  styleUrls: ['./messaging.page.scss'],
})
export class MessagingPage implements OnInit {
  
  @ViewChild('myMessage',null) myMessage: IonInput; 
  
  
  public selfId: string;
  TextMessage: string
  SenderID: string;
  ReciverID: string;

  //loged user
  public AllLogeedUsers: any;
  public myFomr: NgForm;
  public _messages: IMessage[];
  public message: string[];

  constructor(private _MessageService: MessagingService, private dataService: DataService, private _router: Router) { }


  ngOnInit() {
 
    this.showKeybord();
    
    this.contactName = window.localStorage.getItem("_contactName");
    this.contactId = window.localStorage.getItem("_contactId");
    this.contatImage = window.localStorage.getItem("_contactImage")
    this.dataService.MSourceReciver.subscribe(message => this.message = message)
    //this.Run();
  }
  
  showKeybord()
  {
     setTimeout(()=>{
        this.myMessage.setFocus();
     }, 300)
  }
  CloseConversatin() {

    var CurreintUrl = this._router.url;
    var navigationsURLs: string[] = [
      '/home(Chatmessage:messagecomppath)',
      '/notification(Chatmessage:messagecomppath)',
      '/people(Chatmessage:messagecomppath)',
      '/upload(Chatmessage:messagecomppath)',
      '/Connection(Chatmessage:messagecomppath)',
      '/user(Chatmessage:messagecomppath)',
      '/publicpro(Chatmessage:messagecomppath)',
      '/notification_messaging(Chatmessage:messagecomppath)'
    ];

    //alert("current url: " + CurreintUrl);

    if (CurreintUrl == navigationsURLs[0]) {
      this._router.navigateByUrl('/home');
    }
    else if (CurreintUrl == navigationsURLs[1]) {
      this._router.navigateByUrl('/notification');
    }
    else if (CurreintUrl == navigationsURLs[2]) {
      this._router.navigateByUrl('/people');
    }
    else if (CurreintUrl == navigationsURLs[3]) {
      this._router.navigateByUrl('/upload');
    }
    else if (CurreintUrl == navigationsURLs[4]) {
      this._router.navigateByUrl('/Connection');
    }
    else if (CurreintUrl == navigationsURLs[5]) {
      this._router.navigateByUrl('/user');
    }
    else if (CurreintUrl == navigationsURLs[6]) {
      this._router.navigateByUrl('/publicpro');
    }
    else if (CurreintUrl == navigationsURLs[7]) {
      this._router.navigateByUrl('/notification_messaging');
    }
  }
  ScrollBottom() {
    var container = document.getElementById("mesageConatainer");
    //scroll down
    container.style.scrollBehavior = 'smooth';
    //container.style.webkitO='smooth';
    container.scrollTop = container.scrollHeight;
    //scroll-behavior: smooth;
  }
  //send message
  SendMessag(ngForm: NgForm) {
    //window.localStorage.key
    //alert(window.localStorage.key(0));
    if (window.localStorage.getItem("_user1") == undefined) {
      alert(" please login to your account first thank you!!")
    }
    else {
      this._MessageService.postMessage(ngForm.value.TextMessage, ngForm.value.ImageURL)
        .subscribe((data) => {
          console.log(data)
          this.TextMessage = "";

          this.GetMessage();

        },
          error => console.error("error on sending message: ", error))
    }

  }
  //get message async
  async GetMessage() {

    this.selfId = window.localStorage.getItem("_user1");
    // console.log("sender ids dkf "+ this.selfId);
    // var mydoc = document.getElementById("p_message");
    // mydoc.style.visibility = 'hidden';      
    (await this._MessageService.GetMessageServiceData())
      .subscribe((data) => {
        //console.log(data);
        this._messages = data;
        //this.ScrollBottom();        
        this.ScrollBottom();
        // mydoc.style.visibility = 'visible';
      }, error => console.log("error on geting message: ", error));
    // var mydoc = document.getElementById("mySpinner");
    // mydoc.style.visibility = 'hidden';
  }
  Stop() {
    window.location.reload();
  }


  //delet Conversaition
  async DeleteConversation() {

    return (await this._MessageService.DeleteConversationSeervice()).subscribe((data) => {
      console.log("data is deleted " + data)
    });
  }
  //scroll animaged
  scrolTopAnimated() {
    var container = document.getElementById("mesageConatainer");
    //scroll down
    // container.scrollTop = container.scrollHeight;
    var index = 1;
    var top = document.documentElement.scrollTop;
    setInterval(function () {

      if (index * 100 <= 3000) {

        container.scrollTop = top - top / 30 * index;

        index++;
      }

    }, 1000);

  }

  thisUserInfo(id: string) {
    //alert(id);
    //alert("sory not implemented yet!!!");
    //this._router.navigate["/user"]
    //alert("test");
    window.localStorage.setItem("_user2", id);
    this._router.navigate(['/publicpro']);
  }

  Run() {

    var timeIntevalSeconds = 1;

    setInterval(() => {

      if (this.IsCurrentUser() == true) {
      
        this.GetMessage();
        this.ScrollBottom();
      }

    }, timeIntevalSeconds * 10000);

  }
  IsCurrentUser(): boolean {
    var CurreintUrl_2 = this._router.url;
    var navigationsURLs: string[] = [
      '/home(Chatmessage:messagecomppath)',
      '/notification(Chatmessage:messagecomppath)',
      '/people(Chatmessage:messagecomppath)',
      '/upload(Chatmessage:messagecomppath)',
      '/Connection(Chatmessage:messagecomppath)',
      '/user(Chatmessage:messagecomppath)',
      '/publicpro(Chatmessage:messagecomppath)',
      '/notification_messaging(Chatmessage:messagecomppath)'
    ];

    if (CurreintUrl_2 == navigationsURLs[0] ||
      CurreintUrl_2 == navigationsURLs[1] ||
      CurreintUrl_2 == navigationsURLs[2] ||
      CurreintUrl_2 == navigationsURLs[3] ||
      CurreintUrl_2 == navigationsURLs[4] ||
      CurreintUrl_2 == navigationsURLs[5] ||
      CurreintUrl_2 == navigationsURLs[6] ||
      CurreintUrl_2 == navigationsURLs[7]) {
      return true
    }
    else {
      return false;
    }
  }

  contactId:any;
  contatImage:any
  messages:any;
  contactName: string;
  OnSend(message)
  {
    this.messages = message.value;
    console.log(message.value);
     this.contactName = window.localStorage.getItem("_contactName");
     this.contactId = window.localStorage.getItem("_contactId")
     this.contatImage = window.localStorage.getItem("_contactImage")
      
    console.log("send clicked" + this.contactId+ "  " + this.contatImage + " " + this.contactName);
  }

 

}
