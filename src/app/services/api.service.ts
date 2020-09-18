import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends RestService {
  headers: HttpHeaders;
  constructor(public http: HttpClient) {
    super(http)
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'OAuth AgAAAAArMNXHAAYUNL_cMMYSxUa1plUaWTPC5Yc'
    })
  }

  async getInfo() {
    return this.get('https://cloud-api.yandex.net/v1/disk/', this.headers).toPromise();
  }

  async getFiles()
  {
    return this.get('https://cloud-api.yandex.net/v1/disk/resources/files', this.headers).toPromise();
  }

}
