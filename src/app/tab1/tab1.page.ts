import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../services/api.service';
import {isNullOrUndefined} from 'util';
import {InAppBrowser, InAppBrowserOptions} from '@ionic-native/in-app-browser/ngx';
import {PopoverController, Platform} from '@ionic/angular';
import {PopoverComponent} from '../components/popover/popover.component';
import {GuiService} from '../services/gui.service';
import {IonInfiniteScroll} from '@ionic/angular';
import {YandexFile} from '../models/YandexFile.model';
import {FilesizePipe} from '../pipes/filesize.pipe';
import {File} from '@ionic-native/file/ngx';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {NgFormSelectorWarning} from '@angular/forms';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {LoadingController, AlertController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';


@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

    // private pathFile: string = this.file.dataDirectory + 'files/';
    private fileTransfer: FileTransferObject;
    yandexFiles: YandexFile[] = [];
    downloadFile = '';
    log = '';
    pathFile: any;

    constructor(
        public api: ApiService,
        private theInAppBrowser: InAppBrowser,
        public popoverController: PopoverController,
        public guiService: GuiService,
        public file: File,
        private transfer: FileTransfer,
        private fileOpener: FileOpener,
        private loadingController: LoadingController,
        public alertController: AlertController,
        private platform: Platform,
        private route: ActivatedRoute,
    ) {
        this.platform.ready().then(() => {
            if (this.platform.is('ios')) {
                this.pathFile = this.file.dataDirectory;
            } else if (this.platform.is('android')) {
                this.pathFile = this.file.externalDataDirectory;
            } else {
                this.pathFile = this.file.cacheDirectory;
            }
            this.pathFile = this.pathFile + 'files/';
        });
    }

    ionViewWillEnter() {
        // const token = /access_token=([^&]+)/.exec(document.location.hash)[1];
        // console.log('this.route', token);
        // this.api.token = token;
        this.guiService.name = 'Яндекс.Диск';
        this.getFiles();
    }

    ngOnInit() {
        // this.route.queryParams.subscribe(params => {
        //     console.log('params', params)
        // });

    }


    async getInfo() {
        console.log('http');
        try {
            let info = this.api.getInfo();
            info = (isNullOrUndefined(await info)) ? [] : await info;
            console.log(info);
        } catch (err) {
            console.log(err);
        }
    }

    async getFiles() {
        console.log('http');
        try {
            // Обработка запроса на сервер
            let files = this.api.getFiles();
            files = (isNullOrUndefined(await files)) ? [] : await files;
            // Конвертирование объекта в массив
            this.yandexFiles = Object.keys(files).map(i => files[i])[0];
            console.log(files);
            console.log(this.file.dataDirectory);
        } catch (err) {
            console.log(err);
        }
    }

    // Загрузка файла для предпросмотра
    downloadPreview(fileName, filePath) {
        const url = filePath;
        this.fileTransfer = this.transfer.create();
        console.log('download');
        console.log(url);
        this.fileTransfer.download(url, this.pathFile + fileName, true).then((entry) => {
            // here logging our success downloaded file path in mobile.
            console.log('download completed: ' + entry.toURL());
            // open downloaded file
            this.downloadFile = entry.toURL();
        }).catch((error) => {
            // here logging an error.
            console.log('download failed: ' + JSON.stringify(error));
        });
    }

    async presentAlertError() {
        const alert = await this.alertController.create({
            header: 'Ошибка',
            message: 'Сервер недоступен',
            buttons: ['OK']
        });
        await alert.present();
    }

    async presentAlertAccept() {
        const alert = await this.alertController.create({
            header: 'Успешно',
            message: 'Видео добавлено в вашу библиотеку',
            buttons: ['OK']
        });
        await alert.present();
    }

    // Загрузка файла для добавления в библиотеку
    async downloadLibrary(item: YandexFile) {
        const loading = await this.loadingController.create({
            message: 'Пожалуйста подождите...',
        });
        await loading.present();


        const url = item.file;
        this.fileTransfer = this.transfer.create();
        console.log('download');
        console.log(url);
        // this.log = url;
        this.fileTransfer.download(url, this.pathFile + item.name, true).then((entry) => {
            // here logging our success downloaded file path in mobile.
            console.log('download completed: ' + entry.toURL());

            if (item.media_type == 'audio') {
                this.guiService.audioLibrary.push({name: item.name, path: entry.toURL(), size: item.size, created: item.created});
            }
            if (item.media_type == 'video') {
                this.guiService.videoLibrary.push({name: item.name, path: entry.toURL(), size: item.size, created: item.created});
            }
            loading.dismiss();
            this.presentAlertAccept();
        }).catch((error) => {
            // here logging an error.
            this.log = 'download failed: ' + JSON.stringify(error);
            console.log('download failed: ' + JSON.stringify(error));
            loading.dismiss();
            this.presentAlertError();
        });
    }

    openFileHandler() {
        this.fileOpener.open(this.downloadFile, '')
            .then(() => console.log('File is opened'))
            .catch(e => console.log('Error opening file', e));
    }

    // Предпросмотр
    preview(name: string, url: string) {
        this.downloadPreview(name, url);
        this.openFileHandler();
    }

    addLibrary(item: YandexFile) {
        this.downloadLibrary(item);
        // this.guiService.audioLibrary.push({'name':'asdas', 'path': 'asdasd'});
    }

    // Отрыть ссылку
    openWithSystemBrowser(url: string) {
        const target = '_system';
        this.theInAppBrowser.create(url, target);
    }

    async userSetting(ev: any) {
        console.log('click');
        const popover = await this.popoverController.create({
            component: PopoverComponent,
            event: ev,
            translucent: true
        });
        return await popover.present();
    }

    loadData(event) {
        setTimeout(() => {
            event.target.complete();
            // App logic to determine if all data is loaded
            // and disable the infinite scroll
            // if (this.files.length == 1000) {
            //   event.target.disabled = true;
            // }
        }, 500);
    }

    toggleInfiniteScroll() {
        this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }

}
