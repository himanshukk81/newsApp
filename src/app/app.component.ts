import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
import {SessionServiceProvider} from '../providers/session-service/session-service';

//pages 
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {CommentsPage} from  '../pages/comments-modal/comments-modal';
import {NewsByCategory} from  '../pages/news-by-category/news-by-category';
import {AboutUsPage} from  '../pages/about-us/about-us';
import {Login} from  '../pages/login-modal/login-modal';
import {UploadNews} from  '../pages/upload-news/upload-news';
import {Settings} from  '../pages/settings/settings';

import { FCM } from '@ionic-native/fcm';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ListPage;

  pages: Array<{title: string, component: any}>;

  categories=[];

  constructor(public events:Events,public fcm:FCM,public service:SessionServiceProvider,public oneSignal: OneSignal,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    // var loggedInStatus=this.service.getUser().isLoggedIn ? "Logout":"Login";
    // this.pages = [
    //   { title: 'Home', component: HomePage },
    //   { title: 'List', component: ListPage },
    //   { title: 'Upload News', component: ListPage },
    //   { title: 'Settings', component: AboutUsPage},
    //   { title:  this.service.getUser().isLoggedIn ? "Logout":"Login", component: AboutUsPage },
    // ];

    this.categories=[{id:1,name:"Uttar Pradesh"},{id:2,name:"UP-Crime"},
    {id:3,name:"Entertainment"},{id:4,name:"National"},{id:5,name:"Astrology"}]

  }

  initializeApp() {
    this.platform.ready().then(() => {

      // alert("Init Notification");
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.initNotification();
    });
  }

  initNotification()
  {
    this.fcm.subscribeToTopic('marketing');
    
    this.fcm.getToken().then(token => {
      console.log("Token==="+token);
    });

    this.fcm.onNotification().subscribe(data => {
      // alert("Received notification=="+JSON.stringify(data));
      if(data.wasTapped){
        console.log("Received in background");
      } else {
        this.events.publish('post:insert')

        console.log("Received in foreground");
      };
    });

    this.fcm.onTokenRefresh().subscribe(token => {

    });

    this.fcm.unsubscribeFromTopic('marketing');
  }

  // initNotification()
  // {
  //   // this.oneSignal.startInit('98016f7d-a4b4-4af0-b65c-6467f741aab0', '535099627001');

  //   this.oneSignal.startInit('9480bcae-87ef-4b40-b9e0-079d206ac493', '296902787597');

  //   // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

  //   this.oneSignal.handleNotificationReceived().subscribe((result) => {
  //     alert("Notification Received=="+result);
  //   // do something when notification is received
  //   });

  //   this.oneSignal.handleNotificationOpened().subscribe((result) => {
  //     // do something when a notification is opened
  //     alert("Notification on received====="+result);
  //   });

  //   // this.oneSignal.endInit();


  //   // this.oneSignal.setSubscription(false);
  // }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page=='News')
    {
      // this.nav.setRoot('HomePage');
      // this.nav.push(UploadNews);
      this.nav.setRoot(UploadNews);
    }
    else
    {
      this.nav.setRoot(page);
    }
    
  }

  openCategoryPage(category){
    this.nav.setRoot(category);
  }
}
