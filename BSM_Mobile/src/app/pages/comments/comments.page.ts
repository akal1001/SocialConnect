import { Component, OnInit } from "@angular/core";
import { ContentPostService } from "src/app/services/content-post.service";
import { IComment } from 'src/app/interfaces/icomment';
import { IContentPost } from 'src/app/interfaces/icontent-post';


@Component({
  selector: "app-comments",
  templateUrl: "./comments.page.html",
  styleUrls: ["./comments.page.scss"],
})
export class CommentsPage implements OnInit 
{
  public singleContent?:IContentPost;
  constructor(private content: ContentPostService) {}

  ngOnInit() 
  {

    this.GetSilgleContentWithComents();
  }

  GetSilgleContentWithComents() 
  {
    var id = window.localStorage.getItem("_contentId");
    console.log("get id : " + id);
    return this.content.getSingleContenService(id).subscribe((data) => 
    {
      this.singleContent = data;
      console.log(data);
    }, error=>{
      console.log("Error on getting single content wit comment! " + error)
    });
    
  }
  OnUserImage(id)
  {
    console.log(id);
     window.localStorage.setItem("_user2", id);
    
  }

  PostComment(contentId: string, commentrId: string, comment: string) {
    return this.content
      .PostCommentService(contentId, commentrId, comment)
      .subscribe((data) => {
        console.log("Post comment : " + data);
      },
      error=>{
        console.log("Error on posting comment ! " + error)
      });
  }
  likeThisContent(contentId: string, likeerId: string) {
    this.content.PostLikeToTheContent(likeerId, contentId).subscribe((data) => {
      console.log("Post like clicked " + data);
    },
    error=>{
      console.log("Error on posting like! " + error)
    });
  }
  postReplay(replayerId: string, commentId: string, comment: string)
  {
    return this.content.PostReplayForCommentServce(replayerId,commentId, comment)
    .subscribe((data)=>
    {
      console.log("Post repaly : " + data)
    },
    error =>{
      console.log("Error  on post replay: " + error);
    })
  }
  followThisContentPoster(id, ids)
  {

  }
}
