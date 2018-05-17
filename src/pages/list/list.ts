import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http, Response,RequestOptions,Request, RequestMethod,Headers,URLSearchParams, Jsonp} from '@angular/http';
import 'rxjs/add/operator/map';
import {DatabaseProvider} from '../../providers/database/database';
var userCounter=0;
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
    items:any=[];
    itemsLocal:any=[];
    // public db:DatabaseProvider,
  constructor(public db:DatabaseProvider, public navCtrl: NavController, public navParams: NavParams,public http:Http) {
     
    this.items = [];


    this.db.getDatabaseState().subscribe(rdy => {

      if (rdy) {
        this.db.getAllUsers().then(data=>{
          this.itemsLocal=data;
          if(this.itemsLocal.length>3)
          {
            console.log("Local storage data==="+JSON.stringify(this.itemsLocal));
            this.items=this.itemsLocal; 
          }
          else
          {
            console.log("No Data fetching from server");
            this.fetchUsers();
          }
          console.log("First time data==="+JSON.stringify(this.itemsLocal));
        },(err)=>{
          console.log("Error 33==="+err);
        })
      }
    })
  }

  fetchUsers()
  {
    var url="https://reactnativechat.herokuapp.com/api/v1/app/user/test"; 
    this.http.get(url)
    .map(res=>res.json())
    .subscribe(res => {
      this.items=res;
      console.log("items==="+JSON.stringify(this.items));
    },
    err=>{
        console.log("Error==="+err);
    });
  }
  

  fetchUser()
  {
    this.fetchSQLLiteData();
  }
  fetchSQLLiteData()
  {
    this.db.getAllUsers().then(data=>{
      this.itemsLocal=data;
      console.log("users length==="+data.length);
      console.log("Data for sqllite===="+JSON.stringify(data));
      console.log("user data in 49 line==="+JSON.stringify(this.itemsLocal));
    },(err)=>{
      console.log("Error 54==="+err);
    })  
  } 
  addUser()
  {
    // console.log("Items length==="+JSON.stringify(this.items));

    // alert("Calling...");
    // console.log("User counter==="+userCounter);
    // console.log("Calling...")
    if(this.items.length==userCounter)
    {
      this.db.getAllUsers().then(data=>{
        this.itemsLocal=data;
        console.log("user data in storage==="+this.itemsLocal);
      },(err)=>{
        console.log("Error 54==="+err);
      })
      console.log("Successfullly insert===");
    }
    else
    {
      if(this.items[userCounter].id)
      {
        this.db.addUser(this.items[userCounter].id,this.items[userCounter].name).then(data=>{
          userCounter++;
          this.addUser();
          this.items=data;
        },(err)=>{
          console.log("Items error after insert===="+JSON.stringify(err));
        })
        console.log("user info=="+JSON.stringify(this.items[userCounter]));
  
        userCounter++;
        this.addUser();
      }
    }
   
  }



}
