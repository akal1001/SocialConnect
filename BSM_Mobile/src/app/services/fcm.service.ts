import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Platform } from '@ionic/angular';
import { Firebase } from "@ionic-native/firebase/ngx";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

 
  constructor(
    private firebase: Firebase,
    private afs: AngularFirestore,
    private platform: Platform,
    private httpClient: HttpClient
  ) {}

  async getToken() {
    let token;

    if (this.platform.is("android")) {
      token = await this.firebase.getToken();
    }

    if (this.platform.is("ios")) {
      token = await this.firebase.getToken();
      await this.firebase.grantPermission();
    }

    this.saveToken(token);
  }

  private saveToken(token) {
    console.log("token:" + token);
    if (!token) return;

    const devicesRef = this.afs.collection("devices");

    const data = {
      token,
      userId: "testUserId",
    };

    return devicesRef.doc(token).set(data);
  }

  onNotifications() {
    return this.firebase.onNotificationOpen();
  }


  FcmSendMessage():Observable<any>
  {
    let baseUrl='https://fl281u7qk5.execute-api.us-east-1.amazonaws.com/Prod/api/message/SendPush'
    return this.httpClient.post<any>(baseUrl, "");
  }
}

