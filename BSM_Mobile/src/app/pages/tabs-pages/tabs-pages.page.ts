import { Component, OnInit } from "@angular/core";
import { NotificationService } from "src/app/services/notification.service";
import { NativeStorage } from "@ionic-native/native-storage/ngx";

@Component({
  selector: "app-tabs-pages",
  templateUrl: "./tabs-pages.page.html",
  styleUrls: ["./tabs-pages.page.scss"],
})
export class TabsPagesPage implements OnInit {
  myId: string;
  countRequestRecive: any;
  countLike: any;
  constructor(
    private notification: NotificationService,
    private nativeStorage: NativeStorage
  ) {}

  ngOnInit() {
    this.nativeStorage.getItem("_ucr").then(
      (response) => {
        this.myId = response._userId;
        this.GetNotifications(response._userId);
        console.log("myId : " + this.myId);
      },
      (error) => {
        console.log("error geting data from nativeStorage" + error);
      }
    );
  }
  GetNotifications(id: string) {
    this.notification
      .getCountConnectionRequestReciveService(id)
      .subscribe((data) => {
        this.countRequestRecive = data;
        if (this.countRequestRecive > 0) {
          document.getElementById("peopleBadge").style.display = "inline";
        }
        console.log("connection request count: " + this.countRequestRecive);
      });

    this.notification
      .getCountLikeAndCommentNotfication(id)
      .subscribe((data) => {
        this.countLike = data;
        if (this.countLike > 0) {
          document.getElementById("notificationsBadge").style.display =
            "inline";
        }
        console.log("count likes : " + this.countLike);
      });
  }
}
