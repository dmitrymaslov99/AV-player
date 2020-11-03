import {Component, OnInit} from '@angular/core';
import {GuiService} from '../services/gui.service';
import {StreamingMedia, StreamingVideoOptions} from '@ionic-native/streaming-media/ngx';
import {FilesizePipe} from '../pipes/filesize.pipe';
import {Platform} from '@ionic/angular';
import {VideoPlayer} from '@ionic-native/video-player/ngx';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    public platformType;

    constructor(public guiService: GuiService,
                private streamingMedia: StreamingMedia,
                private platform: Platform,
                private videoPlayer: VideoPlayer) {


        this.platform.ready().then(() => {
            if (this.platform.is('ios')) {
                this.platformType = 'ios';
                // this.pathFile = this.file.dataDirectory;
            } else if (this.platform.is('android')) {
                this.platformType = 'android';
                // this.pathFile = this.file.externalDataDirectory;
            } else {
                // this.pathFile = this.file.cacheDirectory;
            }
            // this.pathFile = this.pathFile + 'files/';
        });
    }

    ionViewWillEnter() {
        this.guiService.name = 'Видео';
    }

    play(url: string) {
        let options: StreamingVideoOptions = {
            successCallback: () => {
                console.log('Video played');
            },
            errorCallback: (e) => {
                console.log('Error streaming');
            },
            orientation: 'auto',
            shouldAutoClose: true,
            controls: true
        };

        if (this.platformType === 'ios') {
            this.streamingMedia.playVideo(url, options);
        }
        if (this.platformType === 'android') {
            // this.streamingMedia.playVideo(url, options);
            this.videoPlayer.play(url).then(() => {
                console.log('video completed');
            }).catch(err => {
                console.log(err);
            });
        }
    }

    delete(item: any) {
        const index = this.guiService.videoLibrary.indexOf(item, 0);
        console.log(index);
        if (index > -1) {
            this.guiService.videoLibrary.splice(index, 1);
        }
    }

}
