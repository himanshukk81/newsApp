import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-upload-news',
  templateUrl: 'upload-news.html'
})
export class UploadNews {
  constructor(public navCtrl: NavController,platform: Platform) {
    platform.ready().then(() => {
    
   })
  }

}


