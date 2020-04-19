import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "src/environments/environment.prod";
import { Observable } from 'rxjs';
import { IContentPost } from '../interfaces/icontent-post';
import { IComment } from '../interfaces/icomment';
//import {environment} from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ContentPostService {

  userid?: any;
 
    
 
  private _Url = environment.baseUrl + "Content/";

   constructor(private _httpClient: HttpClient) {
   }
   //Insert content
   postContentServce(ContentPostId: string, PosterReferanceId: string, ImageRefreanceId: string, ArticleOrDescription: string, _DateTime: any, url: string, ArticleHeader: string, fileType:any):Observable<boolean>
    {
       const endpoint = this._Url + "PostContent?ContentPostId=" + ContentPostId + "&PosterReferanceId=" + PosterReferanceId + "&ImageRefreanceId=" + ImageRefreanceId + "&ArticleOrDescription=" + ArticleOrDescription + "&_Date=" + _DateTime + "&ImageUrl=" + url + "&ArticleHeader=" + ArticleHeader + "&fileType=" + fileType;
       return this._httpClient.post<boolean>(endpoint, "");

   }
   async GetData()
   {
       const data = this.ReturnAllContentService();
       return data;
   } 
   //not tested
   getSingleContenService(cntentId:string) :Observable<IContentPost>
   {
       return this._httpClient.get<IContentPost>(this._Url + "content?id=" + cntentId);
   }

   //return all user referance id
   ReturnAllContentService(): Observable<IContentPost[]> {
       return this._httpClient.get<IContentPost[]>(this._Url + "GetAllContentsPosts1?userId="+ window.localStorage.getItem(window.localStorage.key(0)));
   }

   ReturnAllCMyontentService(userPosterId: string): Observable<IContentPost[]> {
       return this._httpClient.get<IContentPost[]>(this._Url + "GetAllMyContentPost?referanceId=" + userPosterId);
   }
   DeleteThisContetPost(contentId:string):Observable<boolean>
   {
       //DeleteThis
       const endpoint = this._Url + "deletethis?contentId="+contentId;
       return this._httpClient.delete<boolean>(endpoint);
   }





   DeleAllContentPostService(): Observable<any> {
       const endpoint = this._Url + "deletAllContent";
       return this._httpClient.delete<any>(endpoint);
   }
   DeleAllMyContentPostService(userposterId: string) {
       const endpoint = this._Url + "deletAllMyContent?contentPosterid=" + userposterId;
       this._httpClient.delete<any>(endpoint, {
           params:
           {

           }
       });
   }
   DeleteThisContentPostService(contentId: string) {
       const endpoint = this._Url + "deleThisConternt?contentId=" + contentId;
       this._httpClient.delete<any>(endpoint);
   }
   //leave a comment to the post
   PostCommentService(psoteId: string, commenterId: string, comment: string):Observable<boolean>
    {
       //localhost:59248/api/content/leaveComment?postedId=ff&commenterId=fff&yourComment=ff
       console.log("comment serve c calld : " + psoteId + " : " + commenterId + " : " + comment);
       const commentEndoint = this._Url + "leaveComment?postedId=" + psoteId + "&commenterId=" + commenterId + "&yourComment=" + comment;
     return  this._httpClient.post<boolean>(commentEndoint, "");
   }
   //post replay for the comment
   PostReplayForCommentServce(replayerId:string, commentId:string, replayText:string):Observable<any>
   {
       //public void PostReplay(string replayerId, string commentId, string replayText)
       const endpoint = this._Url + "postReplay?replayerId=" + replayerId + "&commentId=" + commentId + "&replayText=" + replayText;
       return this._httpClient.post<any>(endpoint,"");
   }
   //post like
   PostLikeToTheContent(likerId:string, contentId:string)
   {
       const endpoint = this._Url + "postLike?likerId=" +  likerId + "&contentid="+contentId;
      return this._httpClient.post<any>(endpoint,"");
   }
   //post follow
   PostFollowService(followerId:string, followedId:string)
   {
       const endpoint = this._Url + "follow?followerId="+ followerId + "&followedId=" + followedId;
       return this._httpClient.post<any>(endpoint,"");
   }
}
