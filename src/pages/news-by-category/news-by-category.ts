import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-news-by-category',
  templateUrl: 'news-by-category.html'
})
export class NewsByCategory {
  constructor(public navCtrl: NavController,platform: Platform) {
    platform.ready().then(() => {
    
   })
  }

}


