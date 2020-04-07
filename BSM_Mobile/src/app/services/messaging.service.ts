import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMessage } from '../interfaces/imessage';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private _url = environment.baseUrl + "Message/";

  constructor(private _httpClient: HttpClient) { }

  //send message
  postMessage(mesage: string, imgURL: string): Observable<boolean> {
    //sender info
  
    let _LocalSenderItem = window.localStorage.getItem("_user1");
    //reciver info
    let _sessionReciverKey = window.sessionStorage.key(0);
    let _sessionReciverItem = window.sessionStorage.getItem(_sessionReciverKey);
    //(string mesage, string imgURL, string senderId, string reciverId

    const endpoint = this._url + "send?mesage=" + mesage + "&imgURL=" + imgURL + "&senderId=" + _LocalSenderItem + "&reciverId=" + _sessionReciverItem;

    return this._httpClient.post<boolean>(endpoint, "");
  }
  //get message
  async GetMessageServiceData() {

    //if user not log out
    if (window.localStorage.key(0) != 'undefined') {
      //sender info
    
      let _LocalSenderItem = window.localStorage.getItem("_user1");
      //reciver info
      let _sessionReciverKey = window.sessionStorage.key(0);
      let _sessionReciverItem = window.sessionStorage.getItem(_sessionReciverKey);
      //(string mesage, string imgURL, string senderId, string reciverId
      console.log("senderId : " + _LocalSenderItem + " : recveir Id" + _sessionReciverItem);
      return this._httpClient.get<IMessage[]>(this._url + 'returnmessage',
        {
          params:
          {
            "sednerId": _LocalSenderItem,
            "reciverId": _sessionReciverItem
          }
        });
    };

  }
  //delte conversation
  async DeleteConversationSeervice() {
    //sender info
   
    let _LocalSenderItem = window.localStorage.getItem("_user1");
    //reciver info
    let _sessionReciverKey = window.sessionStorage.key(0);
    let _sessionReciverItem = window.sessionStorage.getItem(_sessionReciverKey);
    return this._httpClient.delete(this._url + 'DeleteCon',
      {
        params:
        {
          "sednerId": _LocalSenderItem,
          "reciverId": _sessionReciverItem
        }
      });
  }
}
