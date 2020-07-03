import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _url = environment.baseUrl + "Notifications/";

 // private _myId = window.localStorage.getItem("_user1");

  constructor(private _httpClient: HttpClient) { }

  GetMessageNotificationService(myId: string): Observable<any[]> {
    return this._httpClient.get<any>(this._url + "getmymessageotification?myid=" + myId);
  }
  getCountNotification(myId): Observable<number> {
    return this._httpClient.get<number>(this._url + "count?myid=" +  myId);
  }

  // count non mesage notfication
  getCountNoneMessageNotification(myId): Observable<number> {
    return this._httpClient.get<number>(this._url + "countnonmessagenotfication?myid=" + myId);
  }

  //count connectionr request 
  getCountConnectionRequestReciveService(myId:string): Observable<number> {
    return this._httpClient.get<number>(this._url + "countconnectionrequestrecive?myId=" + myId);
  }

  //count like and comment notfication
  getCountLikeAndCommentNotfication(myId: string) {

    return this._httpClient.get<number>(this._url + "count_Likes_Comments?myId=" + myId);
  }

  // //get post notfciation for any
  // GetNewPostNotficationForEveryUsersService(myId:string):Observable<string>
  // {
  //   return this._httpClient.get<string>(this._url + "GetPostNotficationEveryUsers"+ myId);

  // }
  putMessageNotificatisonIsCheckedTrue(myId: string, accessKey: string): Observable<boolean> {
    //string reciverId, string accesskey
    return this._httpClient.post<boolean>(this._url + "IChecked?reciverId=" + myId + "&accessKey=" + accessKey, "")
  }
  //
  putMessageNotficationIsCheckedTrueBySenderAndReciverId(myId: string, senderId: string): Observable<boolean> {
    return this._httpClient.post<boolean>(this._url + "ICheckedBySenderAndReciverID?reciverId=" + myId + "&senderId=" + senderId, "")
  }

  //update notfication status
  putNotficationIsCheckedService(notificationReciverId: string, notificationType: string) {
    return this._httpClient.post<boolean>(this._url + "IsNotficationIsChecked?notificationReciverId=" + notificationReciverId + "&notificationType=" + notificationType, "");
  }

  //get message notfication sender id
  GetMessageNotficationSenderIds(myId: string): Observable<string[]> {
    return this._httpClient.get<string[]>(this._url + "GetMessageNotficationSenderId?myId=" + myId);
  }

  //get all notification 
  Get_llnotficationbyidandtypeServuce(myId) :Observable<any>
  {
    
    return this._httpClient.get<string[]>(this._url + "getallnotficationbyidandtype?myId=" + myId);

  }
}
