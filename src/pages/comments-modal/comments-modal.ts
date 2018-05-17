import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
// import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { AdMobPro } from '@ionic-native/admob-pro';
import { VideoPlayer } from '@ionic-native/video-player';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-comments',
  templateUrl: 'comments-modal.html'
})
export class CommentsPage {
  constructor(public platform:Platform) {
    platform.ready().then(() => {
      
    });
  }
}


