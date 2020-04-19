import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ProfileImageService } from 'src/app/services/profile-image.service';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  constructor(private _proImagSrveice: ProfileImageService, private afStorage: AngularFireStorage) {

  }
  houseImageId: string;
  imageName: string;
  houseId: string;
  _Date: Date;
  imageFilePath: string;
  imageUrl?: string;
  selectedFile: File = null;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;




  @Output()
  public imageEvent = new EventEmitter();

  ngOnInit() {
    this.getProfilePicurNow();
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
  //upload file to firebase and return downloaded image url
  OnSubmit() {

    const id = Math.random().toString().substring(2);
    const firebaseReferace = this.afStorage.ref(id);
    return this.afStorage.upload(id, this.fileToUpload).snapshotChanges().pipe(finalize(() => {
      firebaseReferace.getDownloadURL().subscribe((url) => {

        this._proImagSrveice.postProfileImageFileService(window.localStorage.getItem("_user1"), 'profile', url, 'not imag name').subscribe((response) => {
         
        });


      });
    })).subscribe();
  }
  getProfilePicurNow() {

    //alert("this.imageUrl");

   return this._proImagSrveice.GetProfileImagUrlService(window.localStorage.getItem("_user1")).subscribe((data)=>
   {
      //alert("thsi url sssssssssssssssssssssssssssssssssssss " + data.profileImageUrl);
      console.log(data.profileImageUrl);

      this.imageUrl = data.profileImageUrl;
    }
    ,error => console.log(error)
    );
  }

}
