import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { Media } from '@ionic-native/media/ngx';

import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    File,
    FileTransfer,
    FileTransferObject,
    FileOpener,
    StreamingMedia,
    Media,
    DatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
