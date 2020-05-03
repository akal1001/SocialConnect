import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ConnectionService {
  private _url = environment.baseUrl + "connection/";
  constructor(private _httpClient: HttpClient) {}

  DropConnectionRequest(id: string, friendId: string): Observable<boolean> {
    return this._httpClient.delete<boolean>(
      this._url + "DropConnectionRequest?myId=" + friendId + "&requestedId=" + id
    );
  }
  countFCRService(myid: string): Observable<any> {
    return this._httpClient.get<any>(this._url + "countFCR?userId=" + myid);
  }
  //return all my connection
  GetMyConnection(myid: string): Observable<any> {
    return this._httpClient.get<any>(
      this._url + "GetMyConnections?myId=" + myid
    );
  }
  //post connection request
  PostConnectionRequest(sernderId: string,requestedId: string): Observable<any> {
    const endpoint = this._url +"PostConnectionRequest?myId=" +
      sernderId + "&requestedId=" + requestedId;
    return this._httpClient.post<any>(endpoint, "");
  }
  //
  GetConnectionRequestsSend_ByMe(myid: string): Observable<any> {
    return this._httpClient.get<any>(
      this._url + "GetConnectionRequestReciver?myId=" + myid
    );
  }
  //
  GetConnectionRequestsSend_ToMe(myid: string): Observable<any> {
    return this._httpClient.get<any>(
      this._url + "GetConnectionRequester?myId=" + myid
    );
  }

  AcceptConnectionRequestService(
    myId: string,
    senderId: string
  ): Observable<any> {
    const endpoint =
      this._url +
      "acceptconnectionrequest?myId=" +
      myId 
    return this._httpClient.post<any>(endpoint, "");
  }
  RemoveThisConnection():Observable<boolean>
  {

     return this._httpClient.delete<boolean>("");
  }
}