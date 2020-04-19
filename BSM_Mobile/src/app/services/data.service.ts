import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    public _myId = window.localStorage.getItem("_user1");

    public messageSource = new BehaviorSubject('login');
    currentMessage = this.messageSource.asObservable();
  
    public messageSourceReciver = new BehaviorSubject([]);
    MSourceReciver = this.messageSourceReciver.asObservable();

    

    constructor() { }
  
    changeMessage(message: string) 
    {
      this.messageSource.next(message)
    }
    //message recver
    ChangeSourceReciver(msgInfs: any):any
    {
      //alert("data service : " + msgInfs);
       this.messageSourceReciver.next(msgInfs);
     //  alert("data service : " + msgInfs);
    }

    TranasferDataFormContactToMessagePage(data:any)
    {

    }
}
