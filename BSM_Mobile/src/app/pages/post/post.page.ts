import { Component, OnInit } from '@angular/core';
import { IContentPost } from 'src/app/interfaces/icontent-post';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { ContentPostService } from 'src/app/services/content-post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit, IContentPost {
  _UserProfileImageUrl?: any;
  _posterProfileImageUrl?: any;
  _posterName?: string;
  _ContentType?: string;
  _ContentImageURLs?: string[];
  _countContentPosterFollowrs?: any;
  _conmentLenght?: any;

  _countComments: any;

  contentPostId?: any;
  posterReferanceId: any;
  imageRefreanceId?: any;
  articleOrDescription?: any;
  _DateTime?: string;
  articleHeader?: string;
_countContentLikes?:any;



  houseImageId: string;
  imageName: string;
  houseId: string;
  _Date: Date;
  imageFilePath: string;
  imageUrl: any = "assets/icons/piclogo.JPG";



  selectedFile: File = null;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  imageEvent: any;


  public message?: any;
  public _profileImage_1: any;
  constructor(private _contentPostService: ContentPostService, private afStorage: AngularFireStorage) 
  {

  }

  bucketName = 'fineuploader-demo';

  uploader: any

  ngOnInit() {
    
  }

  fileToUpload: File = null
  //to show image while selected before submit.
  handleFileInput(event) {
    // this.selectedFile = <File>event.target.files[0];

    this.fileToUpload = event.target.files[0];

    this.imageFilePath = event.target.files[0].path;
    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  public fileType = ""
  //upload file to firebase
  UpladFileToFirebase(ngForm: NgForm) {
    
    if(ngForm.value.articleOrDescription != null || this.fileToUpload != undefined)
    {
      document.getElementById("myuploading").style.display="inline"

      const id = Math.random().toString(36).substring(2);
      const fireRef = this.afStorage.ref(id);
      var _file = this.fileToUpload;
     
      if (_file != undefined)
      {
        this.fileType = _file.type.slice(0, 5)
        this.fileToUpload = null;
        this.afStorage.upload(id, _file).snapshotChanges().pipe(finalize(() => {
  
          fireRef.getDownloadURL().subscribe((url) => 
          {
  
            console.log("dowloded url : " + url);
            this._contentPostService.postContentServce(ngForm.value.ContentPostId,
              ngForm.value.posterReferanceId = window.localStorage.getItem("_user1"),
              ngForm.value.imageRefreanceId,
              ngForm.value.articleOrDescription,
              ngForm.value._DateTime,
              url,
              ngForm.value.articleHeader,
              this.fileType)
  
              .subscribe((data) => {
               
                 if(data==true)

                 {
                  document.getElementById("myuploading").style.display="none"
                 }
              },
                error => console.log("error" + error)
              );
            console.log(url);
          })
        })
        ).subscribe();
      }
      else {
        this._contentPostService.postContentServce(ngForm.value.ContentPostId,
          ngForm.value.posterReferanceId = window.localStorage.getItem("_user1"),
          ngForm.value.imageRefreanceId,
          ngForm.value.articleOrDescription,
          ngForm.value._DateTime, "", ngForm.value.articleHeader, this.fileType)
  
          .subscribe((data) => {
          
            if(data==true)

            {
             document.getElementById("myuploading").style.display="none"
            }
  
          },
            error => console.log("error" + error)
          );
      }
  
    }
    else{
      this.message="no file found!!"
    }
    
  }

}
