import { Component, OnInit } from '@angular/core';
import { IContentPost } from 'src/app/interfaces/icontent-post';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { ContentPostService } from 'src/app/services/content-post.service';
import { OnlineService } from 'src/app/services/online.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit, IContentPost {

  contentPostId?: any;
  posterReferanceId: any;
  imageRefreanceId?: any;
  articleOrDescription?: any;
  _DateTime?: string;
  articleHeader?: string;




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
  constructor(private _accountService: AccountService, private _router: Router, private _contentPostService: ContentPostService, private _uploadService: UploadService, private _online: OnlineService, private router: Router, private afStorage: AngularFireStorage) 
  {

  }


  bucketName = 'fineuploader-demo';

  uploader: any;




  ngOnInit() {
    this.IsUserAutenicated();
  }

  IsUserAutenicated() {
    this._accountService.IsUserAuthenticatedService(window.localStorage.getItem("_user1")).subscribe((resposne) => {
      if (resposne == true) {

        this._profileImage_1 = window.localStorage.getItem("_pI1");
      }
      else {

        window.localStorage.clear();
        this._router.navigate(['account']);



      }
    })

  }



  fileToUpload: File = null;


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

  public fileType = "";
  //upload file to firebase
  UpladFileToFirebase(ngForm: NgForm) {
    this.message = "uplaoding file..";
    this.showrunspiner();
    const id = Math.random().toString(36).substring(2);

    const fireRef = this.afStorage.ref(id);
    var _file = this.fileToUpload;
   
    if (_file != undefined)
    {
       this.fileType = _file.type.slice(0, 5);

      // alert(_file.type);
      this.fileToUpload = null;
      this.afStorage.upload(id, _file).snapshotChanges().pipe(finalize(() => {


        fireRef.getDownloadURL().subscribe((url) => {

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
              // alert("posted content data result " + data)
              if (data == true) {
                document.getElementById("postedMesage").setAttribute("style", "color:green");
                this.message = "your content posted successfully!!!" + data
              }
              else if (data == false) {
                document.getElementById("postedMesage").setAttribute("style", "color:red");
                this.message = "something gose worng!!" + data
                //window.location.replace('http://localhost:4200/account');
                window.location.replace('https://testmsg-59a24.firebaseapp.com/account');
              }

            },
              error => console.log("error" + error)
            );
          //postImageFileService(ImageReferanceID: string, ImageDirectory:string, ImageUrl:string, ImageName:string) : Observable<boolean>

          console.log(url);
          this.runspiner();
          ////this._router.navigate(['home']);
          //this.router.navigate(['upload']);
          //window.location.replace('http://localhost:4200/upload')
          //window.location.replace('https://testmsg-59a24.firebaseapp.com/home')
          this.imageUrl = "https://firebasestorage.googleapis.com/v0/b/testhouse-ff733.appspot.com/o/krnuup7zet9?alt=media";


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
          // alert("posted content data result " + data)
          if (data == true) {
            document.getElementById("postedMesage").setAttribute("style", "color:green");
            this.message = "your content posted successfully!!!" + data
          }
          else if (data == false) {
            document.getElementById("postedMesage").setAttribute("style", "color:red");
            this.message = "something gose worng!!" + data
            //window.location.replace('http://localhost:4200/account');
            window.location.replace('https://testmsg-59a24.firebaseapp.com/account');
          }

        },
          error => console.log("error" + error)
        );
    }

  }
  //get image referance id from the browerser session storage
  GetImageReferanceId(): any {
    return window.localStorage.getItem("_user1");
  }
  //uplaod to s3bucket
  // UploadS3bucket() {
  //   this._uploadService.uploadFile(this.fileToUpload);

  // }
  runspiner() {


    document.getElementById("myspiner234").setAttribute("style", "visibility:hidden;");;
    // this.spinType = 'indeterminate';
  }
  showrunspiner() {


    //document.getElementById("myspiner234").setAttribute("style", "visibility:visible;");
    // this.spinType = 'indeterminate';
  }
  //postImageFileService(ImageReferanceID: string, ImageDirectory: string, ImageUrl: string, ImageName: string): Observable<boolean>
  // UploadImage(ImageReferanceID: string, ImageDirectory: string, ImageUrl: string, ImageName: string) {
  //   return this._uploadService.postImageFileService(ImageReferanceID, ImageDirectory, ImageUrl, ImageName)
  // }
  DeleteAllContent() {

  }
  DeleteAll() {
    //this._online.deletOnlineService();
  }

}
