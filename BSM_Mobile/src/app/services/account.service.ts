import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/iuser';
import { FcmService } from './fcm.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  userid?: any;
  username: any;
  useremail?: any;
  userpassword?: any;
  _Date?: string;



  private _accountBaserUrl = environment.baseUrl + "account/";
  constructor(private _httpClient: HttpClient, private fcm:FcmService) {
  }

  // IsUserAuthenticatedService(userId: string): Observable<boolean> {
  //   return this._httpClient.get<boolean>(this._accountBaserUrl + "IsUserAuthenticated?userId=" + userId)
  // }

  IsUserAuthenticatedService(userId: string): Observable<boolean> {
   return this._httpClient.get<boolean>(this._accountBaserUrl + "IsUserAuthenticated?userId=" + userId);
    
  }
  // //returnAllUsers
  // ReturnAllUsers(): Observable<IUsers> {
  //   return this._httpClient.get<IUsers>(this._accountBaserUrl + 'returnAllUsers');
  // }

  DeleteThisUserservice(userid: string): Observable<any> {
    return this._httpClient.delete<any>(this._accountBaserUrl + "deletemyaccount?userId=" + userid);
  }


  //returnAllUsers
  ReturnAllUsers(myId: string): Observable<IUser> {
    return this._httpClient.get<IUser>(this._accountBaserUrl + 'returnAllUsersExpect_Connectd_Requested_Requester?myId=' + myId);
  }


  GetAllLogedUsers(): Observable<any[]> {
    return this._httpClient.get<any[]>(this._accountBaserUrl + 'returnAllUsers');
  }
  //return user id
  //user login
  getUserLoginServe(name11, password): Observable<string> {

    console.log(" name " + name11 + "passwrod : " + password);
    //return this ._httpClient.get<Users>(this._url ," 'name':name,'password':password");
    let result = this._httpClient.get<string>(this._accountBaserUrl + "login",
      {
        params:
        {
          name: name11,
          password: password
        }
      });
    console.log(result)
    return result;
  }
  //user signup  
  postNewUserService(username: string, password: string, email: string): Observable<boolean> {

    // string username, string password, string email
    const endpont = this._accountBaserUrl + "signup?username=" + username + "&password=" + password + "&email=" + email;
    return this._httpClient.post<boolean>(endpont, "");
  }
  //get user info by userid
  S_GetUserInfoByID(userId: string): Observable<any> {
    return this._httpClient.get<any>(this._accountBaserUrl + "GetUserById",
      {
        params: { userId: userId }
      })
  }
  //GetUserPublicProfile
  GetUserPublicProfileInfo(userId: string): Observable<any> {
    return this._httpClient.get<any>(this._accountBaserUrl + "GetUserPublicProfile",
      {
        params: { userId: userId }
      })
  }
  //send user online
  PostUserOnline(userId: string) {

  }
  //delete every users and  their content
  DeleteEverythingService(): Observable<any> {
    return this._httpClient.delete(this._accountBaserUrl + 'deleteEverything')
  }

  //return user profile iamge
  GetUserProfileImageServcice(userId: string): Observable<any> {
    return this._httpClient.get<any>(this._accountBaserUrl + 'GetMyProfileImages?userId=' + userId);
  }

  IsUserExistService(userId: string): Observable<boolean> {
    return this._httpClient.get<boolean>(this._accountBaserUrl + 'IsUserExist?userId=' + userId);
  }


}
