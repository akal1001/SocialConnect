import { Component, OnInit, ViewChild } from "@angular/core";
import { IComment } from "src/app/interfaces/icomment";
import { IContentPost } from "src/app/interfaces/icontent-post";
import { CommentService } from "src/app/services/comment.service";
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { IonInput } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Component({
  selector: "app-comments",
  templateUrl: "./comments.page.html",
  styleUrls: ["./comments.page.scss"],
})
export class CommentsPage implements OnInit {

  @ViewChild('myComment',null) myComment: IonInput;  

  public conentImage: string;
  public singleContent: IContentPost;
  public comments: IComment[];
  constructor(public keyboard: Keyboard,private _commentService: CommentService, private nativeLocalStorage:NativeStorage) {}

  ngOnInit() {
    this.showKeybord();
    this.GetTempData();
    this.GetComents();
  }

  showKeybord()
  {
    setTimeout(()=>{
      this.myComment.setFocus()
    },300)
  }

  doRefresh(event) {
    console.log("Begin async operation");
    this.GetComents()
    setTimeout(() => {
      console.log("Async operation has ended");
      event.target.complete()
    }, 2000)
  }



  OnUserImage(id) {
    console.log(id);
    window.localStorage.setItem("_user2", id)
  }
  GetTempData() {
    
    this.singleContent = {
      contentPostId:window.localStorage.getItem("_cp_Id"),
      _UserProfileImageUrl:window.localStorage.getItem("_cp_up_img_url"),
      _Username:window.localStorage.getItem("_cp_n"),
      _countContentPosterFollowrs:localStorage.getItem("_cp_followrs"),
      articleHeader:localStorage.getItem("_cp_header"),
      articleOrDescription:localStorage.getItem("_cp_description"),
      _ContentType:localStorage.getItem("_cp_cpType"),
      _ContentImageURLs:[localStorage.getItem("_cp_contnet_img_url")],
      _countContentLikes:localStorage.getItem("_cp_likes"),
      _countComments:""
    };
   
  }
  //return comment
  GetComents() {
    this._commentService
      .GetCommentsService(window.localStorage.getItem("_cp_Id"))
      .subscribe((data) => 
      {
        this.comments= data;
      })
  };
  PostComment(comment: string) {
    this.nativeLocalStorage.getItem("_ucr").then((userData)=>{
      if(userData != null)
      {
        var userId =  userData._userId;
        console.log(userId)
        console.log("comment: " + comment);
        return this._commentService
          .PostCommentService(
            localStorage.getItem("_cp_Id"),
            userId,
            comment
          )
          .subscribe(
            (data) => {
              console.log();
              console.log("Post comment : " + data);
              if(data==true)
              {
                this.GetComents();
              }
            },
            (error) => {
              console.log("Error on posting comment ! " + error);
            }
          );
      }
    },error=>{console.log("error on nativelaocaStorage: " + error)})
   
  }
  likeThisComment(commentId: string) {
    alert("like comment id :" + commentId);
  }
  postReplay(replayerId: string, commentId: string, comment: string) {
    return this._commentService
      .PostReplayForCommentServce(replayerId, commentId, comment)
      .subscribe(
        (data) => {
          console.log("Post repaly : " + data);
        },
        (error) => {
          console.log("Error  on post replay: " + error);
        }
      )
  };
}
