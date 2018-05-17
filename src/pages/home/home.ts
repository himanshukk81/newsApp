import { Component } from '@angular/core';
import { NavController,Events } from 'ionic-angular';
import { Platform,ActionSheetController } from 'ionic-angular';
// import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { AdMobPro } from '@ionic-native/admob-pro';
import { VideoPlayer } from '@ionic-native/video-player';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FileChooser } from '@ionic-native/file-chooser';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loginInfo:any;
  videoId:any;

  
  constructor(public mediaCapture:MediaCapture, public fileChooser:FileChooser, public actionSheetCtrl: ActionSheetController,public events:Events,public socialSharing:SocialSharing, public googlePlus:GooglePlus, public fb:Facebook,public videoPlayer: VideoPlayer,public navCtrl: NavController,platform: Platform,private admob: AdMobPro) {
    platform.ready().then(() => {
        var admobid = {
          banner: 'ca-app-pub-1638299465733638/4436217151',
          interstitial: 'ca-app-pub-1638299465733638/8069174553'
        };

        this.admob.createBanner({
            adId: admobid.banner,
            isTesting: true,
            autoShow: true,
            position: this.admob.AD_POSITION.BOTTOM_CENTER,
            overlap:true
        })

        // this.playVideo()

        // this.admob.showBannerAtXY(150,70);
        // this.admob.hideBanner();   
    });
  }

  ionViewDidLoad()
  {
    this.events.subscribe('post:insert', guests => {
      alert("User notify through notification");
      
    })

  }


    presentActionSheet() {
      let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
      {
      text: 'Load from Gallery',
      handler: () => {
       this.getVideo();
      }},
      {
      text: 'Use Camera',
      handler: () => {
       this.capturevideo();
      }},
      {
      text: 'Cancel',
      role: 'cancel'
      }
      ]});
      actionSheet.present();
    }
    getVideo() {
      this.fileChooser.open()
      .then(uri => {
        console.log("URL=="+uri);
      })
      .catch(e =>{
        console.log("error=="+e)
      });
    }
      capturevideo() {
        let options: CaptureVideoOptions = { limit: 1 };
        this.mediaCapture.captureVideo(options)
        .then((videodata: MediaFile[]) => {
            var i, path, len;
            for (i = 0, len = videodata.length; i < len; i += 1) {
               path = videodata[i].fullPath;
            // do something interesting with the file
            }
            this.videoId = path;
            // this.flag_play = false;
            // this.flag_upload = false;
        });
      }
        
    fbLogin()
    {
      this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => 
  
        {
          console.log('Logged into Facebook!', res)
          // alert("Data222=="+JSON.stringify(res));
  
          this.fb.api('me?fields=id,name,email,first_name,location,picture.width(720).height(720).as(picture_large)', []).then(profile => {
            var data = {email: profile['email'], first_name: profile['first_name'],Address:profile['location'],picture: profile['picture_large']['data']['url'], username: profile['name']}
            // alert("data=="+JSON.stringify(data));
          })
          .catch(e=>{
            console.log('Error logging into Facebook3', e);
            alert("Error dfsd--"+JSON.stringify(e));
          });
        })
      .catch(e =>{
        console.log('Error logging into Facebook', e);
        alert("Error--"+JSON.stringify(e));
      }) 
    }

    shareFeedBackEmail()
    {
      var message="Hi this is new message";
      var subject="This is new subject";
      var to=["hkumar@techcraftz.com"];
      var cc=["himanshukk81@gmail.com"];

      this.socialSharing.canShareViaEmail().then(() => {
        // Sharing via email is possible
      }).catch(() => {
        // Sharing via email is not possible
      });
      
      // Share via email
      this.socialSharing.shareViaEmail(message, subject, to, cc).then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
    }
    googleLogin() {
      this.googlePlus.login({})
        .then(res => {
          // alert("Data==="+JSON.stringify(res));
          console.log("Data=="+JSON.stringify(res));
          //  var name=res.displayName;
          //  alert("Name==="+name);
          this.loginInfo.displayName = res.displayName;
          this.loginInfo.email = res.email;
          this.loginInfo.familyName = res.familyName;
          this.loginInfo.givenName = res.givenName;
          this.loginInfo.userId = res.userId;
          this.loginInfo.imageUrl = res.imageUrl;
          this.loginInfo.isLoggedIn = true;

          alert("Login Info==="+JSON.stringify(this))
        })
        .catch(err =>{
          alert("Error=="+err);
          console.error("error=="+err)
        });
    }
  
    logout() {
      this.googlePlus.logout()
        .then(res => {
          console.log(res);
          this.loginInfo.displayName = "";
          this.loginInfo.email = "";
          this.loginInfo.familyName = "";
          this.loginInfo.givenName = "";
          this.loginInfo.userId = "";
          this.loginInfo.imageUrl = "";
  
          this.loginInfo.isLoggedIn = false;
        })
        .catch(err => console.error(err));
    }
}


