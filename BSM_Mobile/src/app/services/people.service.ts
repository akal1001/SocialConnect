import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private _url = environment.baseUrl + "Connection/";
    constructor(private _httpClient: HttpClient) {

    }
    //post connection request
    PostConnectionRequest(sernderId: string, requestedId: string): Observable<any> {
        //  alert("post connect call");
        //const endpont = this._accountBaserUrl + "signup?username=" + username + "&password=" + password + "&email=" + email;
        const endpoint = this._url + "connectionRequest?myid=" + sernderId + "&requesedId=" + requestedId
        return this._httpClient.post<any>(endpoint, "");
    }

    countFCRService(myid: string): Observable<any> {
        return this._httpClient.get<any>(this._url + 'countFCR?userId=' + myid);
    }
    //return all my connection
    GetMyConnection(myid:string):Observable<any>
    {
        return this._httpClient.get<any>(this._url + 'returnAllMyConnections?myId=' + myid);

    }

    //
    GetMyConnectionRequest(myid:string):Observable<any>
    {
        
        return this._httpClient.get<any>(this._url + 'returnConnRequester?myId=' + myid);

    }
    //
    GetMyConnectionSend(myid:string):Observable<any>
    {
        return this._httpClient.get<any>(this._url + 'returnConnRequesReciver?myId=' + myid);

    }

    AcceptConnectionRequestService(myId:string, senderId:string):Observable<any>
    {
        const endpoint = this._url + "acceptconnectionrequest?myId=" + myId + "&sernderId=" + senderId
       return this._httpClient.post<any>(endpoint,"");
    }
    DeleteThisConnectionService(myId:string, requesedId:string)
    {
         
        const endpoint = this._url + "DeleteConnection?myId=" + myId + "&requesedId=" + requesedId
        return this._httpClient.delete<any>(endpoint);
    }
}
