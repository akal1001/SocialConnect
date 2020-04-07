import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IImage } from '../interfaces/iimage';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private _url = environment.baseUrl + "Image/";
  constructor(private _httpClient: HttpClient) { }

  getHouseByHouseId(houseId: string): Observable<any> {
    return this._httpClient.get<any>(this._url + "/getHouseById?houseId=" + houseId);
  }
  //post file to serve 
  postImageFileService(ImageReferanceID: string, ImageDirectory: string, ImageUrl: string, ImageName: string): Observable<boolean> {

    const endpoint = this._url + "/PostImageFileInfo?ImageReferanceID=" + ImageReferanceID + "&ImageDirectory=" + ImageDirectory + "&ImageUrl=" + ImageUrl + "&ImageName=" + ImageName;

    return this._httpClient.put<boolean>(endpoint, "");
  }
  //post image file for contetn
  PostImageFileInfoForContentService(ImageReferanceID: string, ImageDirectory: string, ImageUrl: string, ImageName: string): Observable<boolean> {

    const endpoint = this._url + "/PostImageFileInfoForContent?ImageReferanceID=" + ImageReferanceID + "&ImageDirectory=" + ImageDirectory + "&ImageUrl=" + ImageUrl + "&ImageName=" + ImageName;

    return this._httpClient.put<boolean>(endpoint, "");
  }

  //get image name by house id
  myImageName(userId) {
    return this._httpClient.get(this._url + '/getImageUrlandHouseId?userid=' + userId)
  }
  //get posted file by user id
  getPostedFile(houseId: string): Observable<string> {
    return this._httpClient.get<string>(this._url + '/returnPostedImage?imageName=' + houseId)
  }
  PostImageFileInfoService(image: IImage): Observable<boolean> {

    console.log("post Image Seervice " + image)
    return this._httpClient.post<boolean>(this._url + "/PostImageFileInfo", image,
      {
        headers: new HttpHeaders(
          {
            'Content-type': 'Application/Json'
          })
      });

  }

//
//US East (N. Virginia)
//'us-west-2'


  //aws file uplad service
  //uploadFile(file) {
    // const contentType = file.type;
    // const bucket = new S3({ accessKeyId: 'AKIA4O3HLAEQB24AODVG', secretAccessKey: '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', region: 'US-East' });
    // const params = { Bucket: 'imagefileupladbucket', Key: 'images' + file.name, Body: file, ACL: 'write',GrantWriteACP: 'GrantWriteACP', ContentType: 'application/json' };

    // bucket.upload(params, function (err, data) {
    //   if (err) {
    //     console.log('There was an error uploading your file: ', err);
    //     return false;
    //   }
    //   console.log('Successfully uploaded file.', data);

    //   return true;
    // });

    //for upload progress   
    // bucket.upload(params).on('httpUploadProgress', function (evt)
    // {
    //   console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
    // }).send(function (err, data)
    // {
    //   if (err) 
    //   {
    //     console.log('There was an error uploading your file: ', err);
    //     return false;
    //   }
    //   console.log('Successfully uploaded file.', data);
    //   return true;
    // });
 // }
}
