import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule,NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdMobPro } from '@ionic-native/admob-pro';
import { VideoPlayer } from '@ionic-native/video-player';
import { OneSignal } from '@ionic-native/onesignal';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SessionServiceProvider } from '../providers/session-service/session-service';

//Components

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {CommentsPage} from  '../pages/comments-modal/comments-modal';
import {NewsByCategory} from  '../pages/news-by-category/news-by-category';
import {AboutUsPage} from  '../pages/about-us/about-us';
import {Login} from  '../pages/login-modal/login-modal';
import {UploadNews} from  '../pages/upload-news/upload-news';
import {Settings} from  '../pages/settings/settings';
import { FCM } from '@ionic-native/fcm';
import { FileChooser } from '@ionic-native/file-chooser';
import { Transfer } from '@ionic-native/transfer';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import {Http,HttpModule, Response,RequestOptions,Request, RequestMethod,Headers,URLSearchParams} from '@angular/http';
import { DatabaseProvider } from '../providers/database/database'; 
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLite } from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AboutUsPage,
    Login,
    CommentsPage,
    NewsByCategory,
    UploadNews,
    Settings
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AboutUsPage,
    Login,
    CommentsPage,
    NewsByCategory,
    UploadNews,
    Settings
  ],
  providers: [
    SessionServiceProvider,
    StatusBar,
    SplashScreen,
    AdMobPro,
    VideoPlayer,
    OneSignal,
    Facebook,
    GooglePlus,
    SocialSharing,
    FCM,
    FileChooser,
    Transfer,
    MediaCapture,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    SQLitePorter,
    SQLite
     
  ]
})
export class AppModule {}
