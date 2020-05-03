import { Component, OnInit, Input } from "@angular/core";
import { IComment } from "src/app/interfaces/icomment";
import { AccountService } from "src/app/services/account.service";
import { Router } from "@angular/router";
import { ContentPostService } from "src/app/services/content-post.service";
import { IContentPost } from "src/app/interfaces/icontent-post";
import { LoadingController, Platform } from "@ionic/angular";
@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
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

  public texts1: any;
  public tesId: any;

  public tempData: string[];

  constructor(
    public loadingController: LoadingController,
    private _contentPost: ContentPostService,
    private _AccountService: AccountService,
    private _router: Router, public platform: Platform
  ) {

    platform.ready().then(() => {

      if (platform.is('cordova')){

        //Subscribe on pause i.e. background
        this.platform.pause.subscribe(() => 
        {
          
         
          alert("posue evet fire")
        });

        //Subscribe on resume i.e. foreground 
        this.platform.resume.subscribe(() => {
          this.texts1= "pose"
          window['paused'] = 0;
          
          alert("resule evet fire")
        });
       }
    });
  }
  ngOnInit() {
   
    this.ReturnContentPost()
  }


  doRefresh(event) {
    console.log("Begin async operation");
    
    setTimeout(() => {
      this.ReturnContentPost();
      console.log("Async operation has ended");
      event.target.complete();
    }, 2000);
  }



  public contentList?: IContentPost[] = [];
  public contentList2?:IContentPost[] = [];
  public url = [];

  public lists = [];

  public CountResult: string;
  public followCountreusltu: string;
  public _profileImage_1: string;

  IsUserAutenicated() {
    this._AccountService
      .IsUserAuthenticatedService(window.localStorage.getItem("_user1"))
      .subscribe((resposne) => {
        if (resposne == true) {
          this._profileImage_1 = window.localStorage.getItem("_pI1");

          this.ReturnContentPost();
        } else {
          this._profileImage_1 = window.localStorage.getItem("_pI1");

          this.ReturnContentPost();
          this._router.navigateByUrl("/login");
        }
      });
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
  ReturnContentPost() 
  {
     this._contentPost.ReturnAllContentService().subscribe(
      (data) => {
        
        document.getElementById("mysponer").style.display="none";
        this.contentList2 = data;
      },
      (error) => {
        console.log(error);
      }
      
    );
  }
 
  
  changeColor(id)
  { document.getElementById(id).style.color="#0073ff" 
    setTimeout(() => 
    {
       document.getElementById(id).style.color="gray" 
    }, 2000);
  }

  likeThisContent(contentId: string)
   {
     this.changeColor(contentId +100)
    if (window.localStorage.getItem("_user1") == undefined) 
    {
      alert("Login required!");
    } else {
      this._contentPost
        .PostLikeToTheContent(window.localStorage.getItem("_user1"), contentId)
        .subscribe((response) => {
          this.CountResult = response;
          document.getElementById(contentId).innerText = response + " likes";
          console.log("count result : " + response);
        });
    }
  }
  followThisContentPoster(followedId: string) {
    this.changeColor(followedId+400);
    if (window.localStorage.getItem("_user1") == undefined) {
      alert("Login required!");
    } else {
      this._contentPost
        .PostFollowService(window.localStorage.getItem("_user1"), followedId)
        .subscribe((respone) => {
          this.followCountreusltu = respone + "followers";
          // alert( "follwo this user id :" + respone)
          console.log("followr count " + respone);
          document.getElementById(followedId).innerHTML =
            respone + " followers";
        });
    }
  }
  Share(id)
  {
    this.changeColor(id+300)
  }
  //create element for live comment
  createElementForComment(
    commentText: string,
    values: string
  ) {
    var realParrent = document.getElementById(values);
    // var newDiv = document.createElement("div");
    var paremet = document.createElement("div");
    paremet.setAttribute("style", "width:100%");

    ////paremet.id= "commendiv";
    var dhr = document.createElement("hr");
    var dUL = document.createElement("ul");
    dUL.setAttribute("style", "width:100%; padding:0%");

    var dliImage = document.createElement("li");
    dliImage.setAttribute(
      "style",
      "list-style:none; vertical-align: 0%; width:10%;padding:1%;display: inline-block"
    );

    var dliComment = document.createElement("li");
    dliComment.setAttribute(
      "style",
      "display: inline-block;list-style:none;vertical-align: 0%; width:90%, padding:1%"
    );

    dUL.appendChild(dliImage);
    dUL.appendChild(dliComment);
    dUL.appendChild(dhr);

    var dImage = document.createElement("img");
    dImage.setAttribute("style", "width:100%; height:60px;border-radius: 50%");
    dImage.src = this._profileImage_1;
    // dImage.src = "https://firebasestorage.googleapis.com/v0/b/testhouse-ff733.appspot.com/o/wkopfemsgj?alt=media";

    dliImage.appendChild(dImage);

    var dp = document.createElement("p");
    dp.innerHTML = commentText;
    dp.setAttribute(
      "style",
      "width:100%;padding:1%;word-wrap: break-word;vertical-align: 0%"
    );

    dliComment.appendChild(dp);

    paremet.appendChild(dUL);

    realParrent.appendChild(paremet);

    //document.body.appendChild(paremet);
  }
  thisUserInfo(id: string) {
   
    window.localStorage.setItem("_user2", id);
    this._router.navigate(["/publicpro"]);
  }

  OnComment(content: IContentPost) {
    window.localStorage.setItem("_cp_Id", content.contentPostId);
    window.localStorage.setItem("_cp_up_img_url", content._UserProfileImageUrl);
    window.localStorage.setItem("_cp_n", content._Username);
    window.localStorage.setItem(
      "_cp_followrs",
      content._countContentPosterFollowrs + "folowers"
    );
    window.localStorage.setItem("_cp_header", content.articleHeader);
    window.localStorage.setItem(
      "_cp_description",
      content.articleOrDescription
    );
    window.localStorage.setItem(
      "_cp_contnet_img_url",
      content._ContentImageURLs[0]
    );
    window.localStorage.setItem(
      "_cp_likes",
      content._countContentLikes + " likes"
    );
    window.localStorage.setItem("_cp_comment", "comment");
    window.localStorage.setItem(
      "_cp_follower",
      content._countContentPosterFollowrs + " follow"
    );
    window.localStorage.setItem("_cp_cpType", content._ContentType);
    window.localStorage.setItem("_cp_comment_count", content._conmentLenght);
  }
  OnUserImage(id) {
    console.log(id);
    window.localStorage.setItem("_user2", id);
  }
}
