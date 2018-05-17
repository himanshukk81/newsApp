import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about-us.html'
})
export class AboutUsPage {
  items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.items = [];
    for(let i = 0; i < 2000; i++){
   
      let item = {
        title: 'Title',
        body: 'body',
        avatarUrl: 'https://avatars.io/facebook/random'+i
      };
   
      this.items.push(item);
    } 
  }
}
