import {Component, OnInit} from '@angular/core';
import {InAppBrowser, InAppBrowserEvent} from '@ionic-native/in-app-browser/ngx';
import {ApiService} from '../services/api.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-autorization',
    templateUrl: './autorization.page.html',
    styleUrls: ['./autorization.page.scss'],
})
export class AutorizationPage implements OnInit {

    constructor(private  inAppBrowser: InAppBrowser, private api: ApiService, private router: Router) {
    }

    public currentURL;
    public liveToken = null;


    ngOnInit() {
    }

    open_link() {
        console.log('open_link');
        // window.open('https://oauth.yandex.ru/authorize?response_type=token&client_id=1858432844d746e4b96125bf28938539');
        // let url = 'https://oauth.yandex.ru/authorize?response_type=token&client_id=1858432844d746e4b96125bf28938539';
        let url = 'https://oauth.yandex.ru/authorize?response_type=token&client_id=596d09471138412f8cd6499c6c090f22';

        let browserRef = window.open(url, '_blank', 'location=yes');
        browserRef.addEventListener('loadstart', (event: any) => {
            console.log('I am here', event.url);
            let token = /access_token=([^&]+)/.exec(event.url)[1];
            console.log('access_token', token);
            if (token) {
                this.api.token = token;
                console.log('this.api.token', this.api.token);
                browserRef.close();
                this.router.navigate(['tabs/tab1']);
            }
        });
        // let browser = this.inAppBrowser.create(url, '_self', 'location=yes');
        // browser.show();

        // browser.on('loadstart').subscribe((event: InAppBrowserEvent) => {
        //     this.currentURL = event.url;
        //     const url = event.url;
        //
        //     console.log('url', url);
        //
        //     this.liveToken = /access_token=([^&]+)/.exec(url)[1];
        //     // this.testToken = /token2=([^&]+)/.exec(url)[1];
        //     console.log('liveToken', this.liveToken);
        //     if (this.liveToken) {
        //         browser.close();
        //     }
        // });
    }


}
