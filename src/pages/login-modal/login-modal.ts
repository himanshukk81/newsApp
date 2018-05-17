import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login-modal.html'
})
export class Login {
  constructor(public navCtrl: NavController,platform: Platform) {
    platform.ready().then(() => {
    
   })
  }

}


