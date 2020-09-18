import { Component, OnInit } from '@angular/core';
import { GuiService } from '../services/gui.service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { FilesizePipe } from '../pipes/filesize.pipe';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public guiService: GuiService,
    private streamingMedia: StreamingMedia) { }

  ionViewWillEnter() {
    this.guiService.name = 'Видео';
  }

  play(url: string) {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'auto',
      shouldAutoClose: true,
      controls: true
    };

    this.streamingMedia.playVideo(url, options);
  }

  delete(item: any) {
    const index = this.guiService.videoLibrary.indexOf(item, 0);
    console.log(index)
    if (index > -1) {
      this.guiService.videoLibrary.splice(index, 1);
    }
  }

}
