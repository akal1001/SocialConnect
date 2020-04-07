import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {
  private _url = environment.baseUrl + "ProfileImage/";

  constructor(private _httpClient: HttpClient) { }

  //post file to serve 
  postProfileImageFileService(ImageReferanceID: string, ImageDirectory: string, ImageUrl: string, ImageName: string): Observable<boolean> {

    const endpoint = this._url + "PostImageFileInfo?ImageReferanceID=" + ImageReferanceID + "&ImageDirectory=" + ImageDirectory + "&ImageUrl=" + ImageUrl + "&ImageName=" + ImageName;

    return this._httpClient.put<boolean>(endpoint, "");
  }
  //return my profile image
  GetProfileImagUrlService(userId: string): Observable<any> {
    //const endpoint = 
    return this._httpClient.get<any>(this._url + "GetMyProfileImageUrl?userId=" + userId);
  }
}
