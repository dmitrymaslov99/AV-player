import {Injectable} from '@angular/core';
import {RestService} from './rest.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService extends RestService {
    headers2: HttpHeaders;
    public token;

    constructor(public http: HttpClient) {
        super(http);
        this.headers2 = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `OAuth AgAAAAArMNXHAAYUNL_cMMYSxUa1plUaWTPC5Yc`
        });
    }
    // AgAAAABH16KuAAYUNIDGF4ugUEOcnAphuq7QNeE
    // AgAAAABH16KuAAYUNIDGF4ugUEOcnAphuq7QNeE
    // AgAAAABH16KuAAYUNIDGF4ugUEOcnAphuq7QNeE
    // AgAAAAArMNXHAAYUNL_cMMYSxUa1plUaWTPC5Yc
    // AgAAAABH16KuAAYUNIDGF4ugUEOcnAphuq7QNeE
    // AgAAAABH16KuAAYUNIDGF4ugUEOcnAphuq7QNeE
    async getInfo() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `OAuth ${this.token}`
        });
        return this.get('https://cloud-api.yandex.net/v1/disk/', headers).toPromise();
    }

    async getFiles() {

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `OAuth ${this.token}`
        });
        return this.get('https://cloud-api.yandex.net/v1/disk/resources/files', headers).toPromise();
    }

}
