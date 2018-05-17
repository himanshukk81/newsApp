import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class Settings {
  constructor(public navCtrl: NavController,platform: Platform) {
    platform.ready().then(() => {
    
   })
  }

}


