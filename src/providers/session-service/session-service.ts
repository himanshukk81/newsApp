import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SessionServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let userInfo;

export class SessionServiceProvider {
  constructor() {
    console.log('Hello SessionServiceProvider Provider');
  }

  setUser(user)
  {
    userInfo=user;
  }
 
  getUser()
  {
    return userInfo;
  }

}
