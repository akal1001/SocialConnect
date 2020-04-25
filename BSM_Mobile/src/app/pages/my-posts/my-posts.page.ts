import { Component, OnInit } from '@angular/core';
import { MyPostsService } from 'src/app/services/my-posts.service';
import { IContentPost } from 'src/app/interfaces/icontent-post';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.page.html',
  styleUrls: ['./my-posts.page.scss'],
})
export class MyPostsPage implements OnInit {

  public myContents:IContentPost[];
  constructor(private myPostsService: MyPostsService) { }

  ngOnInit() {
    this.GetAllMyPosts()
  }
  
  GetAllMyPosts()
  {
     this.myPostsService.AllCMyontentData(localStorage.getItem("_user1"))
     .subscribe((data)=>
     {
       console.log(data);
       this.myContents = data;
     },error=>{console.log("Error occure while getting your content posts" + error)})
  };


  DeleteThis(id)
  {
     this.myPostsService.DeleteThisContetPostData(id)
     .subscribe((data)=>{
       if(data == true)
       {
         document.getElementById(id).remove();
         
       }
     },error=>{
       console.log("Error occured while deleteing " + error);
     })
  }
}
