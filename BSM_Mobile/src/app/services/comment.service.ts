import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IComment } from '../interfaces/icomment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private _Url = environment.baseUrl + "comment/";
  constructor(private _httpClient: HttpClient) { }

  //return comment by content referace id
  GetCommentsService(contentReferanceId:string):Observable<IComment[]>
  {
    return this._httpClient.get<IComment[]>(this._Url + "getComments?contentId="+ contentReferanceId);
  }
  //post comment
  PostCommentService(psoteId: string, commenterId: string, comment: string):Observable<boolean>
  {
    console.log("comment serve c calld : " + psoteId + " : " + commenterId + " : " + comment);
    const commentEndoint = this._Url + "leaveComment?postedId=" + psoteId + "&commenterId=" + commenterId + "&yourComment=" + comment;
    return  this._httpClient.post<boolean>(commentEndoint, "");
  }
   //post replay for the comment
  PostReplayForCommentServce(replayerId:string, commentId:string, replayText:string):Observable<any>
   {
       const endpoint = this._Url + "postReplay?replayerId=" + replayerId + "&commentId=" + commentId + "&replayText=" + replayText;
       return this._httpClient.post<any>(endpoint,"");
  }

}
