import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
var userCounter=0;
var users=[];
@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  
  private databaseReady: BehaviorSubject<boolean>;
 
  constructor(public storage:Storage,public sqlitePorter: SQLitePorter,private sqlite: SQLite, private platform: Platform, private http: Http) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'userdata.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.storage.get('database_filled').then(val => {
            console.log("Data====27=========");
            if (val) {
              this.databaseReady.next(true);
            } else {
              this.fillDatabase();
            }
          });
        });
    });
  }
 
  fillDatabase() {
    console.log("Fill Database");
    this.http.get('assets/dummyDump.sql')
      .map(res => res.text())
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.databaseReady.next(true);
            this.storage.set('database_filled', true);
          })
          .catch(e => console.error(e));
      });
  }
 
  // addUser(userList) {
  //   users=userList;
  //   this.insertInSQL();
  // }

  addUser(id,name)
  {
      console.log("Add user===");  
      // var data=[users[userCounter].id,users[userCounter].name];
      var data=[id,name];
      return this.database.executeSql("INSERT INTO \"userdata\" (id,name) VALUES (?, ?)", data).then(data => {
        console.log("Database 61==="+data);  
        return data;
        //  userCounter++;
         // this.insertInSQL();
       }, err => {
         console.log('Error 66: ', JSON.stringify(err));
         return err;
       });
    // }
  }  

 
  getAllUsers() {
    console.log("Get all user")
    return this.database.executeSql("SELECT * FROM \"userdata\"", []).then((data) => {
      let users = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          users.push({ name: data.rows.item(i).name, id: data.rows.item(i).id});
        }
      }
      console.log("Users list==="+JSON.stringify(users));
      return users;
    }, err => {
      console.log('Error: ', JSON.stringify(err));
      return [];
    });
  }
 
  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
 
}
