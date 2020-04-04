import { Component, OnInit, Input } from '@angular/core';
import { IComment } from 'src/app/interfaces/icomment';
import { DataService } from 'src/app/services/data.service';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { ContentPostService } from 'src/app/services/content-post.service';
import { IContentPost } from 'src/app/interfaces/icontent-post';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  contentPostId?: any;
  posterReferanceId?: any;
  imageRefreanceId?: any;
  articleOrDescription?: any;
  _DateTime?: string;
  _posterProfileImageUrl?: any;
  _posterName?: string;
  _countContentPosterFollowrs?: number;
  _countContentLikes?: number;
  //not maped
  _conmentLenght?: number;
  _comments?: IComment[];

  comment?: string;



  
  @Input() testV: any;

  public texts: any;
  public tesId;
//https://youtu.be/6wD4V0rvlDI
//https://youtu.be/6wD4V0rvlDI
  public vid = "dQw4w9WgXcQ";
  public sharedVedio: any = 'https://www.youtube.com/embed/M7Zc1jHf-00';


  constructor(private _contentPost: ContentPostService, private _dataService: DataService, private _AccountService: AccountService, private _router: Router) { }
  ngOnInit() {

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);


    this.IsUserAutenicated();



  }


  public contentList?: IContentPost[] = [];
  public contentList2?= [];
  public url = []

  public lists = [];

  public CountResult: string;
  public followCountreusltu: string;
  public _profileImage_1: string;

  // IsUserAutenicated() {
  //   this._AccountService.IsUserAuthenticatedService(window.localStorage.getItem("_user1")).subscribe((resposne) => {
  //     if (resposne == true) {
  //       this._profileImage_1 = window.localStorage.getItem("_pI1");

  //       this.ReturnContentPost();
  //     }
  //     else {

  //       window.localStorage.clear();
  //       this._router.navigate(['account']);



  //     }
  //   })

  // }

  IsUserAutenicated() {
    this._AccountService.IsUserAuthenticatedService(window.localStorage.getItem("_user1")).subscribe((resposne) => {
      if (resposne == true) {
        this._profileImage_1 = window.localStorage.getItem("_pI1");

        this.ReturnContentPost();
      }
      else {

        this._profileImage_1 = window.localStorage.getItem("_pI1");

        this.ReturnContentPost();



      }
    })

  }
  returnImg(userid: any) {

    return this._AccountService.S_GetUserInfoByID(userid).subscribe((img) => {
      img.profileImageURL;
    });


  }
  public imgUser: string;
  //return user info by its Id
  GetUserInfoB(userId: string): any {
    return this._AccountService.S_GetUserInfoByID(userId).subscribe((data) => {

      if (data != undefined) {
        //reciver name
        //this.imgUser = data.profileImageURL
        //  this.newMessage(data.profileImageURL);
      }
    });
  }
  ReturnContentPost() {


    return this._contentPost.ReturnAllContentService().subscribe((data) => {
      for (var i in data) {
        this.GetUserInfoB(data[i].posterReferanceId);
        data[i]._posterProfileImageUrl = this.imgUser;
        data[i]._conmentLenght = data[i]._comments.length;
        this.contentList2.push(data[i]);
      }
      this.runspiner();
      this.contentList2 = data;

    },
      error => {
        return console.log(error);
      });



  }
  runspiner() {

    document.getElementById("myspiner2").remove();
    // this.spinType = 'indeterminate';
  }
  //delete all content
  DeleteAllContentPost() {
    this._contentPost.DeleAllContentPostService().subscribe((da) => {
      console.log(da);

    });
  }
  getId(ids: string) {
    alert("test " + ids);
  }
  myFunction() {
    var element = document.getElementById("myDIV");
    element.classList.toggle("mystyle");
  }
  leaveComment(commentForm: NgForm, ids: string, values: string) {

    if (window.localStorage.getItem("_user1") == undefined) {
      alert("Login required!")
    }
    else {

      this.GetUserInfoB(window.localStorage.getItem("_user1"));

      // alert("test " + ids);
      // document.getElementById("").

      console.log("usre Id " + window.localStorage.getItem("_user1"));
      console.log("clickc" + this.tesId);

      return this._contentPost.PostCommentService(ids, window.localStorage.getItem("_user1"), commentForm.value.comment).subscribe((response) => {
        if (response == true) {
          this.createElementForComment(commentForm.value.comment, ids, values);
          this.comment = null;
        }
      });
    }



  }
  likeThisContent(contentId: string) {
    if (window.localStorage.getItem("_user1") == undefined) {
      alert("Login required!")
    }
    else {



      this._contentPost.PostLikeToTheContent(window.localStorage.getItem("_user1"), contentId).subscribe((response) => {
        this.CountResult = response;
        document.getElementById(contentId + 20).innerText = response + " likes";
        console.log("count result : " + response);
      });
    }

  }
  likeThisComment(commentId: string) {

    alert("like comment id :" + commentId)
  }
  followThisContentPoster(followedId: string) {

    if (window.localStorage.getItem("_user1") == undefined) {
      alert("Login required!")
    }
    else {

      this._contentPost.PostFollowService(window.localStorage.getItem("_user1"), followedId).subscribe((respone) => {
        this.followCountreusltu = respone + "followers";
        // alert( "follwo this user id :" + respone)
        console.log("followr count " + respone);
        document.getElementById(followedId).innerHTML = respone + " followers";
      });
    }





  }
  ReplayToTheComment(commentId: string, replayText: string) {


    if (window.localStorage.getItem("_user1") == undefined) {
      alert("Login required!")
    }
    else {

      // alert("Replay functon called :  "+ commentId + "Replay text  : " + replayText);

      return this._contentPost.PostReplayForCommentServce(window.localStorage.getItem("_user1"), commentId, replayText).subscribe();
    }


  }
  //create element for live comment
  createElementForComment(commentText: string, parantelemetnId: string, values: string) {


    var realParrent = document.getElementById(values);
    // var newDiv = document.createElement("div"); 
    var paremet = document.createElement("div");
    paremet.setAttribute("style", "width:100%")


    ////paremet.id= "commendiv";
    var dhr = document.createElement("hr");
    var dUL = document.createElement("ul");
    dUL.setAttribute("style", "width:100%; padding:0%")

    var dliImage = document.createElement("li");
    dliImage.setAttribute("style", "list-style:none; vertical-align: 0%; width:10%;padding:1%;display: inline-block");

    var dliComment = document.createElement("li");
    dliComment.setAttribute("style", "display: inline-block;list-style:none;vertical-align: 0%; width:90%, padding:1%");

    dUL.appendChild(dliImage);
    dUL.appendChild(dliComment);
    dUL.appendChild(dhr);

    var dImage = document.createElement("img");
    dImage.setAttribute("style", "width:100%; height:60px;border-radius: 50%");
    dImage.src = this._profileImage_1;
    // dImage.src = "https://firebasestorage.googleapis.com/v0/b/testhouse-ff733.appspot.com/o/wkopfemsgj?alt=media";

    dliImage.appendChild(dImage);


    var dp = document.createElement('p');
    dp.innerHTML = commentText;
    dp.setAttribute("style", "width:100%;padding:1%;word-wrap: break-word;vertical-align: 0%");

    dliComment.appendChild(dp);


    paremet.appendChild(dUL);

    realParrent.appendChild(paremet);

    //document.body.appendChild(paremet);  
  }
  thisUserInfo(id: string) {
    //alert(id);
    //alert("sory not implemented yet!!!");
    //this._router.navigate["/user"]
    //alert("test");
    window.localStorage.setItem("_user2", id);
    this._router.navigate(['/publicpro']);
  
  }

}
