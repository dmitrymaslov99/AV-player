import { Component, OnInit } from '@angular/core';
import { GuiService } from '../services/gui.service';
import { NavController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { AudioLibrary } from '../models/AudioLibrary'


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  currentIndex: number = 0;
  storageDirectory: any;
  music: any;
  curr_playing_file: MediaObject = null;
  get_duration_interval: any;
  get_position_interval: any;
  message: any;
  duration: any = -1;
  position: any = 0;

  is_playing: boolean = false;
  is_in_play: boolean = false;
  is_ready: boolean = false;


  constructor(public guiService: GuiService,
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private file: File,
    private transfer: FileTransfer,
    private media: Media,
    private datePipe: DatePipe) {
    this.platform.ready().then(() => {
      if (this.platform.is('ios')) {
        this.storageDirectory = this.file.dataDirectory;
      } else if (this.platform.is('android')) {
        this.storageDirectory = this.file.externalDataDirectory;
      } else {
        this.storageDirectory = this.file.cacheDirectory;
      }
      this.storageDirectory = this.storageDirectory + 'files/';
    });
  }

  ionViewWillEnter() {
    this.guiService.name = 'Музыка';
  }

  play(item: AudioLibrary) {
    console.log(item);
    this.music = item;
    this.getDurationAndSetToPlay();
    //   this.curr_playing_file = this.media.create(item.path);
    //   this.curr_playing_file.play();
    //   console.log(this.storageDirectory);
  }

  createAudioFile(pathToDirectory, filename): MediaObject {
    if (this.platform.is('ios')) {
      //ios
      console.log("asdasd" + pathToDirectory);
      return this.media.create(
        pathToDirectory.replace(/^file:\/\//, '') + filename
      );
    } else {
      // android
      return this.media.create(pathToDirectory + filename);
    }
  }

  getDurationAndSetToPlay() {
    this.curr_playing_file = this.createAudioFile(
      this.storageDirectory,
      this.music.name
    );
    this.curr_playing_file.play();
    // this.is_playing = true;
    // this.is_ready = true;
    //   this.duration = this.curr_playing_file.getDuration()


    this.curr_playing_file.setVolume(0.0); // you don't want users to notice that you are playing the file
    let self = this;
    this.get_duration_interval = setInterval(function () {
      if (self.duration == -1) {
        self.duration = ~~self.curr_playing_file.getDuration(); // make it an integer
      } else {
        self.curr_playing_file.stop();
        self.curr_playing_file.release();
        self.setRecordingToPlay();
        clearInterval(self.get_duration_interval);
      }
    }, 100);
    console.log(this.duration);
    // this.curr_playing_file.setVolume(0.0); // you don't want users to notice that you are playing the file
    // let self = this;
    // this.get_duration_interval = setInterval(function () {
    //   self.duration = ~~self.curr_playing_file.getDuration(); // make it an integer
    //   // self.setRecordingToPlay();
    //   clearInterval(self.get_duration_interval);
    // }, 100);
  }


  setRecordingToPlay() {
    this.curr_playing_file = this.createAudioFile(
      this.storageDirectory,
      this.music.name
    );
    this.curr_playing_file.onStatusUpdate.subscribe(status => {
      // 2: playing
      // 3: pause
      // 4: stop
      this.message = status;
      switch (status) {
        case 1:
          this.is_in_play = false;
          break;
        case 2: // 2: playing
          this.is_in_play = true;
          this.is_playing = true;
          break;
        case 3: // 3: pause
          this.is_in_play = true;
          this.is_playing = false;
          break;
        case 4: // 4: stop
        default:
          this.is_in_play = false;
          this.is_playing = false;
          break;
      }
    });
    console.log('audio file set');
    this.message = 'audio file set';
    this.is_ready = true;
    this.getAndSetCurrentAudioPosition();
  }

  getAndSetCurrentAudioPosition() {
    let diff = 1;
    let self = this;
    this.get_position_interval = setInterval(function () {
      let last_position = self.position;
      self.curr_playing_file.getCurrentPosition().then(position => {
        if (position >= 0 && position < self.duration) {
          if (Math.abs(last_position - position) >= diff) {
            // set position
            self.curr_playing_file.seekTo(last_position * 1000);
          } else {
            // update position for display
            self.position = position;
          }
        } else if (position >= self.duration) {
          self.stopPlayRecording();
          self.setRecordingToPlay();
        }
      });
    }, 100);
    this.curr_playing_file.play();
  }

  change() {
    console.log("positionpositionposition" + this.position);
    this.curr_playing_file.seekTo(this.position);
  }

  playRecording() {
    this.curr_playing_file.play();
    this.toastCtrl
      .create({
        message: `Start playing from ${this.fmtMSS(this.position)}`,
        duration: 2000
      })
      .then(toastEl => toastEl.present());
  }

  pausePlayRecording() {
    this.curr_playing_file.pause();
    this.toastCtrl
      .create({
        message: `Paused at ${this.fmtMSS(this.position)}`,
        duration: 2000
      })
      .then(toastEl => toastEl.present());
  }


  stopPlayRecording() {
    this.curr_playing_file.stop();
    this.curr_playing_file.release();
    clearInterval(this.get_position_interval);
    this.position = 0;
  }

  // stopPlayRecording() {
  //   this.curr_playing_file.stop();
  //   this.curr_playing_file.release();
  //   clearInterval(this.get_position_interval);
  //   this.position = 0;
  // }

  controlSeconds(action) {
    this.stopPlayRecording();
    switch (action) {
      case 'back':

        break;
      case 'forward':

        break;
      default:
        break;
    }
  }

  fmtMSS(s) {
    return this.datePipe.transform(s * 1000, 'mm:ss');

    /** The following has been replaced with Angular DatePipe */
    // // accepts seconds as Number or String. Returns m:ss
    // return (
    //   (s - // take value s and subtract (will try to convert String to Number)
    //     (s %= 60)) / // the new value of s, now holding the remainder of s divided by 60
    //     // (will also try to convert String to Number)
    //     60 + // and divide the resulting Number by 60
    //   // (can never result in a fractional value = no need for rounding)
    //   // to which we concatenate a String (converts the Number to String)
    //   // who's reference is chosen by the conditional operator:
    //   (9 < s // if    seconds is larger than 9
    //     ? ':' // then  we don't need to prepend a zero
    //     : ':0') + // else  we do need to prepend a zero
    //   s
    // ); // and we add Number s to the string (converting it to String as well)
  }
}
