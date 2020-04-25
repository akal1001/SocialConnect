import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { HttpClient } from "@angular/common/http";
import { IContentPost } from "../interfaces/icontent-post";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MyPostsService {
  private _Url = environment.baseUrl + "Content/";
  constructor(private _httpClient: HttpClient) {}

  AllCMyontentData(userPosterId: string): Observable<IContentPost[]> {
    return this._httpClient.get<IContentPost[]>(
      this._Url + "GetAllMyContentPost?referanceId=" + userPosterId
    );
  }

  DeleAllMyContentPostData(userposterId: string) {
    const endpoint =
      this._Url + "deletAllMyContent?contentPosterid=" + userposterId;
    this._httpClient.delete<any>(endpoint, {
      params: {},
    });
  }
  DeleteThisContetPostData(contentId: string): Observable<boolean> {
    //DeleteThis
    const endpoint = this._Url + "deletethis?contentId=" + contentId;
    return this._httpClient.delete<boolean>(endpoint);
  }

  DeleAllContentPostData(): Observable<any> {
    const endpoint = this._Url + "deletAllContent";
    return this._httpClient.delete<any>(endpoint);
  }
}
