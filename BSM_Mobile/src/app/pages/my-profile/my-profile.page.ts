import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { finalize, window } from "rxjs/operators";
import { ProfileImageService } from "src/app/services/profile-image.service";
import {
  AngularFireStorageReference,
  AngularFireUploadTask,
  AngularFireStorage,
} from "angularfire2/storage";
import { Observable } from "rxjs";
import { AccountService } from "src/app/services/account.service";
import { error } from "protractor";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.page.html",
  styleUrls: ["./my-profile.page.scss"],
})
export class MyProfilePage implements OnInit {
  constructor(
    private _proImagSrveice: ProfileImageService,
    private afStorage: AngularFireStorage,
    private account: AccountService
  ) {}
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
    };
    reader.readAsDataURL(this.fileToUpload);
  }
  //upload file to firebase and return downloaded image url
  OnSubmit() {
    const id = Math.random().toString().substring(2);
    const firebaseReferace = this.afStorage.ref(id);
    return this.afStorage
      .upload(id, this.fileToUpload)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          firebaseReferace.getDownloadURL().subscribe((url) => 
          {
            localStorage.setItem("_pI1", url)
            
            this._proImagSrveice
              .postProfileImageFileService(
                localStorage.getItem("_user1"),
                "profile",
                url,
                "not imag name"
              )
              .subscribe((response) => {});
          });
        })
      )
      .subscribe();
  }
  getProfilePicurNow() {
    this.imageUrl = localStorage.getItem("_pI1");
  }

  deletemyaccount() {
    this.account
      .DeleteThisUserservice(localStorage.getItem("_user1"))
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log("error on deleteing account: " + error);
        }
      );
  }
}
