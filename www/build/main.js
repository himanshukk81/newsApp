webpackJsonp([0],{

/***/ 160:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 160;

/***/ }),

/***/ 205:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 205;

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionServiceProvider; });
/*
  Generated class for the SessionServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var userInfo;
var SessionServiceProvider = /** @class */ (function () {
    function SessionServiceProvider() {
        console.log('Hello SessionServiceProvider Provider');
    }
    SessionServiceProvider.prototype.setUser = function (user) {
        userInfo = user;
    };
    SessionServiceProvider.prototype.getUser = function () {
        return userInfo;
    };
    return SessionServiceProvider;
}());

//# sourceMappingURL=session-service.js.map

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_database_database__ = __webpack_require__(258);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var userCounter = 0;
var ListPage = /** @class */ (function () {
    // public db:DatabaseProvider,
    function ListPage(db, navCtrl, navParams, http) {
        var _this = this;
        this.db = db;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.items = [];
        this.itemsLocal = [];
        this.items = [];
        this.db.getDatabaseState().subscribe(function (rdy) {
            if (rdy) {
                _this.db.getAllUsers().then(function (data) {
                    _this.itemsLocal = data;
                    if (_this.itemsLocal.length > 3) {
                        console.log("Local storage data===" + JSON.stringify(_this.itemsLocal));
                        _this.items = _this.itemsLocal;
                    }
                    else {
                        console.log("No Data fetching from server");
                        _this.fetchUsers();
                    }
                    console.log("First time data===" + JSON.stringify(_this.itemsLocal));
                }, function (err) {
                    console.log("Error 33===" + err);
                });
            }
        });
    }
    ListPage.prototype.fetchUsers = function () {
        var _this = this;
        var url = "https://reactnativechat.herokuapp.com/api/v1/app/user/test";
        this.http.get(url)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.items = res;
            console.log("items===" + JSON.stringify(_this.items));
        }, function (err) {
            console.log("Error===" + err);
        });
    };
    ListPage.prototype.fetchUser = function () {
        this.fetchSQLLiteData();
    };
    ListPage.prototype.fetchSQLLiteData = function () {
        var _this = this;
        this.db.getAllUsers().then(function (data) {
            _this.itemsLocal = data;
            console.log("users length===" + data.length);
            console.log("Data for sqllite====" + JSON.stringify(data));
            console.log("user data in 49 line===" + JSON.stringify(_this.itemsLocal));
        }, function (err) {
            console.log("Error 54===" + err);
        });
    };
    ListPage.prototype.addUser = function () {
        // console.log("Items length==="+JSON.stringify(this.items));
        var _this = this;
        // alert("Calling...");
        // console.log("User counter==="+userCounter);
        // console.log("Calling...")
        if (this.items.length == userCounter) {
            this.db.getAllUsers().then(function (data) {
                _this.itemsLocal = data;
                console.log("user data in storage===" + _this.itemsLocal);
            }, function (err) {
                console.log("Error 54===" + err);
            });
            console.log("Successfullly insert===");
        }
        else {
            if (this.items[userCounter].id) {
                this.db.addUser(this.items[userCounter].id, this.items[userCounter].name).then(function (data) {
                    userCounter++;
                    _this.addUser();
                    _this.items = data;
                }, function (err) {
                    console.log("Items error after insert====" + JSON.stringify(err));
                });
                console.log("user info==" + JSON.stringify(this.items[userCounter]));
                userCounter++;
                this.addUser();
            }
        }
    };
    ListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"/Users/himanshu/NewsApp/NewsApp/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <button ion-button (click)="addUser()">\n      Add User\n    </button>\n    <button ion-button (click)="fetchUser()">\n       Fetch User\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item *ngFor="let item of items">\n      <!-- <ion-avatar item-left>\n        <ion-img [src]="item.avatarUrl"></ion-img>\n      </ion-avatar> -->\n \n      <h2>{{item.id}}</h2>\n \n      <!-- <p>{{item.body}}</p> -->\n \n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/himanshu/NewsApp/NewsApp/src/pages/list/list.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__providers_database_database__["a" /* DatabaseProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_database_database__["a" /* DatabaseProvider */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _d || Object])
    ], ListPage);
    return ListPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite_porter__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(352);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var userCounter = 0;
var users = [];
var DatabaseProvider = /** @class */ (function () {
    function DatabaseProvider(storage, sqlitePorter, sqlite, platform, http) {
        var _this = this;
        this.storage = storage;
        this.sqlitePorter = sqlitePorter;
        this.sqlite = sqlite;
        this.platform = platform;
        this.http = http;
        this.databaseReady = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["BehaviorSubject"](false);
        this.platform.ready().then(function () {
            _this.sqlite.create({
                name: 'userdata.db',
                location: 'default'
            })
                .then(function (db) {
                _this.database = db;
                _this.storage.get('database_filled').then(function (val) {
                    console.log("Data====27=========");
                    if (val) {
                        _this.databaseReady.next(true);
                    }
                    else {
                        _this.fillDatabase();
                    }
                });
            });
        });
    }
    DatabaseProvider.prototype.fillDatabase = function () {
        var _this = this;
        console.log("Fill Database");
        this.http.get('assets/dummyDump.sql')
            .map(function (res) { return res.text(); })
            .subscribe(function (sql) {
            _this.sqlitePorter.importSqlToDb(_this.database, sql)
                .then(function (data) {
                _this.databaseReady.next(true);
                _this.storage.set('database_filled', true);
            })
                .catch(function (e) { return console.error(e); });
        });
    };
    // addUser(userList) {
    //   users=userList;
    //   this.insertInSQL();
    // }
    DatabaseProvider.prototype.addUser = function (id, name) {
        console.log("Add user===");
        // var data=[users[userCounter].id,users[userCounter].name];
        var data = [id, name];
        return this.database.executeSql("INSERT INTO \"userdata\" (id,name) VALUES (?, ?)", data).then(function (data) {
            console.log("Database 61===" + data);
            return data;
            //  userCounter++;
            // this.insertInSQL();
        }, function (err) {
            console.log('Error 66: ', JSON.stringify(err));
            return err;
        });
        // }
    };
    DatabaseProvider.prototype.getAllUsers = function () {
        console.log("Get all user");
        return this.database.executeSql("SELECT * FROM \"userdata\"", []).then(function (data) {
            var users = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    users.push({ name: data.rows.item(i).name, id: data.rows.item(i).id });
                }
            }
            console.log("Users list===" + JSON.stringify(users));
            return users;
        }, function (err) {
            console.log('Error: ', JSON.stringify(err));
            return [];
        });
    };
    DatabaseProvider.prototype.getDatabaseState = function () {
        return this.databaseReady.asObservable();
    };
    DatabaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite_porter__["a" /* SQLitePorter */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */]])
    ], DatabaseProvider);
    return DatabaseProvider;
}());

//# sourceMappingURL=database.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadNews; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UploadNews = /** @class */ (function () {
    function UploadNews(navCtrl, platform) {
        this.navCtrl = navCtrl;
        platform.ready().then(function () {
        });
    }
    UploadNews = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-upload-news',template:/*ion-inline-start:"/Users/himanshu/NewsApp/NewsApp/src/pages/upload-news/upload-news.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n    \n    <button ion-button  (click)="shareFeedBackEmail()">Share</button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content overflow-scroll="true">\n    <!-- <video controls="controls" preload="metadata" autoplay="autoplay" webkit-playsinline="webkit-playsinline" class="videoPlayer">\n     <source src="./assets/videos/Part_1.mp4" type="video/mp4" />\n    </video> -->\n<!-- \n    <ion-list>\n      <ion-item >\n        \n      </ion-item>  \n\n      \n    </ion-list>   -->\n\n    <ion-grid>\n        <ion-row>\n          <ion-col>\n              <button ion-button  (click)="fbLogin()"><ion-icon name="logo-facebook"></ion-icon> <span style="color:white"> Facebook</span></button>\n          </ion-col>\n          <ion-col>\n            <button ion-button color="danger" (click)="googleLogin()"><ion-icon name="logo-googleplus"></ion-icon> <span style="color:white">   Google</span></button> \n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    <!-- <h2>My Name is himanshu</h2> -->\n</ion-content>\n'/*ion-inline-end:"/Users/himanshu/NewsApp/NewsApp/src/pages/upload-news/upload-news.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]])
    ], UploadNews);
    return UploadNews;
}());

//# sourceMappingURL=upload-news.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(362);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_admob_pro__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_video_player__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_onesignal__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_facebook__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_plus__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_social_sharing__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_session_service_session_service__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_component__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_home_home__ = __webpack_require__(690);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_list_list__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_comments_modal_comments_modal__ = __webpack_require__(691);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_news_by_category_news_by_category__ = __webpack_require__(692);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_about_us_about_us__ = __webpack_require__(693);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_login_modal_login_modal__ = __webpack_require__(694);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_upload_news_upload_news__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_settings_settings__ = __webpack_require__(695);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_fcm__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_file_chooser__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_transfer__ = __webpack_require__(696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_media_capture__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__angular_http__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_database_database__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_sqlite_porter__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_sqlite__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_storage__ = __webpack_require__(352);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












//Components


















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_about_us_about_us__["a" /* AboutUsPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_login_modal_login_modal__["a" /* Login */],
                __WEBPACK_IMPORTED_MODULE_15__pages_comments_modal_comments_modal__["a" /* CommentsPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_news_by_category_news_by_category__["a" /* NewsByCategory */],
                __WEBPACK_IMPORTED_MODULE_19__pages_upload_news_upload_news__["a" /* UploadNews */],
                __WEBPACK_IMPORTED_MODULE_20__pages_settings_settings__["a" /* Settings */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_29__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_about_us_about_us__["a" /* AboutUsPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_login_modal_login_modal__["a" /* Login */],
                __WEBPACK_IMPORTED_MODULE_15__pages_comments_modal_comments_modal__["a" /* CommentsPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_news_by_category_news_by_category__["a" /* NewsByCategory */],
                __WEBPACK_IMPORTED_MODULE_19__pages_upload_news_upload_news__["a" /* UploadNews */],
                __WEBPACK_IMPORTED_MODULE_20__pages_settings_settings__["a" /* Settings */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_11__providers_session_service_session_service__["a" /* SessionServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_admob_pro__["a" /* AdMobPro */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_video_player__["a" /* VideoPlayer */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_onesignal__["a" /* OneSignal */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_facebook__["a" /* Facebook */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_plus__["a" /* GooglePlus */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_fcm__["a" /* FCM */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_file_chooser__["a" /* FileChooser */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_transfer__["a" /* Transfer */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_media_capture__["a" /* MediaCapture */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_26__providers_database_database__["a" /* DatabaseProvider */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_sqlite_porter__["a" /* SQLitePorter */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_sqlite__["a" /* SQLite */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_onesignal__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_session_service_session_service__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_list_list__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_upload_news_upload_news__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_fcm__ = __webpack_require__(354);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyApp = /** @class */ (function () {
    function MyApp(events, fcm, service, oneSignal, platform, statusBar, splashScreen) {
        this.events = events;
        this.fcm = fcm;
        this.service = service;
        this.oneSignal = oneSignal;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */];
        this.categories = [];
        this.initializeApp();
        // used for an example of ngFor and navigation
        // var loggedInStatus=this.service.getUser().isLoggedIn ? "Logout":"Login";
        // this.pages = [
        //   { title: 'Home', component: HomePage },
        //   { title: 'List', component: ListPage },
        //   { title: 'Upload News', component: ListPage },
        //   { title: 'Settings', component: AboutUsPage},
        //   { title:  this.service.getUser().isLoggedIn ? "Logout":"Login", component: AboutUsPage },
        // ];
        this.categories = [{ id: 1, name: "Uttar Pradesh" }, { id: 2, name: "UP-Crime" },
            { id: 3, name: "Entertainment" }, { id: 4, name: "National" }, { id: 5, name: "Astrology" }];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // alert("Init Notification");
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.initNotification();
        });
    };
    MyApp.prototype.initNotification = function () {
        var _this = this;
        this.fcm.subscribeToTopic('marketing');
        this.fcm.getToken().then(function (token) {
            console.log("Token===" + token);
        });
        this.fcm.onNotification().subscribe(function (data) {
            // alert("Received notification=="+JSON.stringify(data));
            if (data.wasTapped) {
                console.log("Received in background");
            }
            else {
                _this.events.publish('post:insert');
                console.log("Received in foreground");
            }
            ;
        });
        this.fcm.onTokenRefresh().subscribe(function (token) {
        });
        this.fcm.unsubscribeFromTopic('marketing');
    };
    // initNotification()
    // {
    //   // this.oneSignal.startInit('98016f7d-a4b4-4af0-b65c-6467f741aab0', '535099627001');
    //   this.oneSignal.startInit('9480bcae-87ef-4b40-b9e0-079d206ac493', '296902787597');
    //   // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    //   this.oneSignal.handleNotificationReceived().subscribe((result) => {
    //     alert("Notification Received=="+result);
    //   // do something when notification is received
    //   });
    //   this.oneSignal.handleNotificationOpened().subscribe((result) => {
    //     // do something when a notification is opened
    //     alert("Notification on received====="+result);
    //   });
    //   // this.oneSignal.endInit();
    //   // this.oneSignal.setSubscription(false);
    // }
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page == 'News') {
            // this.nav.setRoot('HomePage');
            // this.nav.push(UploadNews);
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_upload_news_upload_news__["a" /* UploadNews */]);
        }
        else {
            this.nav.setRoot(page);
        }
    };
    MyApp.prototype.openCategoryPage = function (category) {
        this.nav.setRoot(category);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/himanshu/NewsApp/NewsApp/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <!-- <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list> -->\n\n    <ion-list>\n      <ion-item (click)="openPage(\'HomePage\')" menuClose>\n          <ion-icon name="home" item-left large></ion-icon>\n          <h2>Home</h2>\n      </ion-item>  \n    </ion-list>\n\n    <ion-list>\n        <ion-item-divider color="danger">Categories</ion-item-divider>\n        <ion-card *ngFor="let category of categories">\n            <ion-item color="light" text-wrap (click)="openCategoryPage(\'NewsByCategory\')" menuClose>\n                <ion-icon name="md-clipboard" item-left large></ion-icon>\n                <h2> {{ category.name }} </h2>\n                <!-- <p> {{ category.description }}</p> -->\n            </ion-item>\n        </ion-card>  \n\n        <ion-item-divider color="danger">Account</ion-item-divider>\n\n        <ion-item (click)="openPage(\'signup\')" menuClose>\n          <ion-icon name="md-clipboard" item-left large></ion-icon>\n          <h2>LogIn</h2>\n        </ion-item>\n\n        <ion-item-divider color="danger">News</ion-item-divider>\n\n        <ion-item (click)="openPage(\'News\')" menuClose>\n          <ion-icon name="md-clipboard" item-left large></ion-icon>\n          <h2>Upload News</h2>\n        </ion-item>\n  \n    </ion-list>\n\n  </ion-content>\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/himanshu/NewsApp/NewsApp/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_fcm__["a" /* FCM */], __WEBPACK_IMPORTED_MODULE_5__providers_session_service_session_service__["a" /* SessionServiceProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 690:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_admob_pro__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_video_player__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_facebook__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_plus__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_chooser__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_media_capture__ = __webpack_require__(356);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';







var HomePage = /** @class */ (function () {
    function HomePage(mediaCapture, fileChooser, actionSheetCtrl, events, socialSharing, googlePlus, fb, videoPlayer, navCtrl, platform, admob) {
        var _this = this;
        this.mediaCapture = mediaCapture;
        this.fileChooser = fileChooser;
        this.actionSheetCtrl = actionSheetCtrl;
        this.events = events;
        this.socialSharing = socialSharing;
        this.googlePlus = googlePlus;
        this.fb = fb;
        this.videoPlayer = videoPlayer;
        this.navCtrl = navCtrl;
        this.admob = admob;
        platform.ready().then(function () {
            var admobid = {
                banner: 'ca-app-pub-1638299465733638/4436217151',
                interstitial: 'ca-app-pub-1638299465733638/8069174553'
            };
            _this.admob.createBanner({
                adId: admobid.banner,
                isTesting: true,
                autoShow: true,
                position: _this.admob.AD_POSITION.BOTTOM_CENTER,
                overlap: true
            });
            // this.playVideo()
            // this.admob.showBannerAtXY(150,70);
            // this.admob.hideBanner();   
        });
    }
    HomePage.prototype.ionViewDidLoad = function () {
        this.events.subscribe('post:insert', function (guests) {
            alert("User notify through notification");
        });
    };
    HomePage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Gallery',
                    handler: function () {
                        _this.getVideo();
                    }
                },
                {
                    text: 'Use Camera',
                    handler: function () {
                        _this.capturevideo();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    HomePage.prototype.getVideo = function () {
        this.fileChooser.open()
            .then(function (uri) {
            console.log("URL==" + uri);
        })
            .catch(function (e) {
            console.log("error==" + e);
        });
    };
    HomePage.prototype.capturevideo = function () {
        var _this = this;
        var options = { limit: 1 };
        this.mediaCapture.captureVideo(options)
            .then(function (videodata) {
            var i, path, len;
            for (i = 0, len = videodata.length; i < len; i += 1) {
                path = videodata[i].fullPath;
                // do something interesting with the file
            }
            _this.videoId = path;
            // this.flag_play = false;
            // this.flag_upload = false;
        });
    };
    HomePage.prototype.fbLogin = function () {
        var _this = this;
        this.fb.login(['public_profile', 'user_friends', 'email'])
            .then(function (res) {
            console.log('Logged into Facebook!', res);
            // alert("Data222=="+JSON.stringify(res));
            _this.fb.api('me?fields=id,name,email,first_name,location,picture.width(720).height(720).as(picture_large)', []).then(function (profile) {
                var data = { email: profile['email'], first_name: profile['first_name'], Address: profile['location'], picture: profile['picture_large']['data']['url'], username: profile['name'] };
                // alert("data=="+JSON.stringify(data));
            })
                .catch(function (e) {
                console.log('Error logging into Facebook3', e);
                alert("Error dfsd--" + JSON.stringify(e));
            });
        })
            .catch(function (e) {
            console.log('Error logging into Facebook', e);
            alert("Error--" + JSON.stringify(e));
        });
    };
    HomePage.prototype.shareFeedBackEmail = function () {
        var message = "Hi this is new message";
        var subject = "This is new subject";
        var to = ["hkumar@techcraftz.com"];
        var cc = ["himanshukk81@gmail.com"];
        this.socialSharing.canShareViaEmail().then(function () {
            // Sharing via email is possible
        }).catch(function () {
            // Sharing via email is not possible
        });
        // Share via email
        this.socialSharing.shareViaEmail(message, subject, to, cc).then(function () {
            // Success!
        }).catch(function () {
            // Error!
        });
    };
    HomePage.prototype.googleLogin = function () {
        var _this = this;
        this.googlePlus.login({})
            .then(function (res) {
            // alert("Data==="+JSON.stringify(res));
            console.log("Data==" + JSON.stringify(res));
            //  var name=res.displayName;
            //  alert("Name==="+name);
            _this.loginInfo.displayName = res.displayName;
            _this.loginInfo.email = res.email;
            _this.loginInfo.familyName = res.familyName;
            _this.loginInfo.givenName = res.givenName;
            _this.loginInfo.userId = res.userId;
            _this.loginInfo.imageUrl = res.imageUrl;
            _this.loginInfo.isLoggedIn = true;
            alert("Login Info===" + JSON.stringify(_this));
        })
            .catch(function (err) {
            alert("Error==" + err);
            console.error("error==" + err);
        });
    };
    HomePage.prototype.logout = function () {
        var _this = this;
        this.googlePlus.logout()
            .then(function (res) {
            console.log(res);
            _this.loginInfo.displayName = "";
            _this.loginInfo.email = "";
            _this.loginInfo.familyName = "";
            _this.loginInfo.givenName = "";
            _this.loginInfo.userId = "";
            _this.loginInfo.imageUrl = "";
            _this.loginInfo.isLoggedIn = false;
        })
            .catch(function (err) { return console.error(err); });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/himanshu/NewsApp/NewsApp/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n    \n    <!-- <button ion-button  (click)="shareFeedBackEmail()">Share</button> -->\n  </ion-navbar>\n</ion-header>\n\n<ion-content overflow-scroll="true">\n    <!-- <video controls="controls" preload="metadata" autoplay="autoplay" webkit-playsinline="webkit-playsinline" class="videoPlayer">\n     <source src="./assets/videos/Part_1.mp4" type="video/mp4" />\n    </video> -->\n<!-- \n    <ion-list>\n      <ion-item >\n        \n      </ion-item>  \n\n      \n    </ion-list>   -->\n\n    <ion-grid>\n        <ion-row>\n          <ion-col>\n              <button ion-button  (click)="fbLogin()"><ion-icon name="logo-facebook"></ion-icon> <span style="color:white"> Facebook</span></button>\n          </ion-col>\n          <ion-col>\n            <button ion-button color="danger" (click)="googleLogin()"><ion-icon name="logo-googleplus"></ion-icon> <span style="color:white">   Google</span></button> \n          </ion-col>\n          <ion-col>\n            <button ion-button color="secondary" (click)="presentActionSheet()">Browse Video</button>\n          </ion-col>  \n          </ion-row>\n      </ion-grid>\n    <!-- <h2>My Name is himanshu</h2> -->\n</ion-content>\n'/*ion-inline-end:"/Users/himanshu/NewsApp/NewsApp/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__ionic_native_media_capture__["a" /* MediaCapture */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_chooser__["a" /* FileChooser */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_plus__["a" /* GooglePlus */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_video_player__["a" /* VideoPlayer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_admob_pro__["a" /* AdMobPro */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 691:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CommentsPage = /** @class */ (function () {
    function CommentsPage(platform) {
        this.platform = platform;
        platform.ready().then(function () {
        });
    }
    CommentsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-comments',template:/*ion-inline-start:"/Users/himanshu/NewsApp/NewsApp/src/pages/comments-modal/comments-modal.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n    \n    <button ion-button  (click)="shareFeedBackEmail()">Share</button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content overflow-scroll="true">\n    <!-- <video controls="controls" preload="metadata" autoplay="autoplay" webkit-playsinline="webkit-playsinline" class="videoPlayer">\n     <source src="./assets/videos/Part_1.mp4" type="video/mp4" />\n    </video> -->\n<!-- \n    <ion-list>\n      <ion-item >\n        \n      </ion-item>  \n\n      \n    </ion-list>   -->\n\n    <ion-grid>\n        <ion-row>\n          <ion-col>\n              <button ion-button  (click)="fbLogin()"><ion-icon name="logo-facebook"></ion-icon> <span style="color:white"> Facebook</span></button>\n          </ion-col>\n          <ion-col>\n            <button ion-button color="danger" (click)="googleLogin()"><ion-icon name="logo-googleplus"></ion-icon> <span style="color:white">   Google</span></button> \n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    <!-- <h2>My Name is himanshu</h2> -->\n</ion-content>\n'/*ion-inline-end:"/Users/himanshu/NewsApp/NewsApp/src/pages/comments-modal/comments-modal.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]])
    ], CommentsPage);
    return CommentsPage;
}());

//# sourceMappingURL=comments-modal.js.map

/***/ }),

/***/ 692:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsByCategory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NewsByCategory = /** @class */ (function () {
    function NewsByCategory(navCtrl, platform) {
        this.navCtrl = navCtrl;
        platform.ready().then(function () {
        });
    }
    NewsByCategory = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-news-by-category',template:/*ion-inline-start:"/Users/himanshu/NewsApp/NewsApp/src/pages/news-by-category/news-by-category.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n    \n    <button ion-button  (click)="shareFeedBackEmail()">Share</button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content overflow-scroll="true">\n    <!-- <video controls="controls" preload="metadata" autoplay="autoplay" webkit-playsinline="webkit-playsinline" class="videoPlayer">\n     <source src="./assets/videos/Part_1.mp4" type="video/mp4" />\n    </video> -->\n<!-- \n    <ion-list>\n      <ion-item >\n        \n      </ion-item>  \n\n      \n    </ion-list>   -->\n\n    <ion-grid>\n        <ion-row>\n          <ion-col>\n              <button ion-button  (click)="fbLogin()"><ion-icon name="logo-facebook"></ion-icon> <span style="color:white"> Facebook</span></button>\n          </ion-col>\n          <ion-col>\n            <button ion-button color="danger" (click)="googleLogin()"><ion-icon name="logo-googleplus"></ion-icon> <span style="color:white">   Google</span></button> \n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    <!-- <h2>My Name is himanshu</h2> -->\n</ion-content>\n'/*ion-inline-end:"/Users/himanshu/NewsApp/NewsApp/src/pages/news-by-category/news-by-category.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]])
    ], NewsByCategory);
    return NewsByCategory;
}());

//# sourceMappingURL=news-by-category.js.map

/***/ }),

/***/ 693:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutUsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutUsPage = /** @class */ (function () {
    function AboutUsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.items = [];
        for (var i = 0; i < 2000; i++) {
            var item = {
                title: 'Title',
                body: 'body',
                avatarUrl: 'https://avatars.io/facebook/random' + i
            };
            this.items.push(item);
        }
    }
    AboutUsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"/Users/himanshu/NewsApp/NewsApp/src/pages/about-us/about-us.html"*/'<ion-header>\n  <ion-navbar>\n      <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n      </button>\n    <ion-title>\n      Virtual Scroll\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n \n<ion-content>\n \n  <ion-list [virtualScroll]="items">\n \n    <ion-item *virtualItem="let item">\n      <ion-avatar item-left>\n        <ion-img [src]="item.avatarUrl"></ion-img>\n      </ion-avatar>\n \n      <h2>{{item.title}}</h2>\n \n      <p>{{item.body}}</p>\n \n    </ion-item>\n \n  </ion-list>\n \n</ion-content>'/*ion-inline-end:"/Users/himanshu/NewsApp/NewsApp/src/pages/about-us/about-us.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], AboutUsPage);
    return AboutUsPage;
}());

//# sourceMappingURL=about-us.js.map

/***/ }),

/***/ 694:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Login; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Login = /** @class */ (function () {
    function Login(navCtrl, platform) {
        this.navCtrl = navCtrl;
        platform.ready().then(function () {
        });
    }
    Login = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/himanshu/NewsApp/NewsApp/src/pages/login-modal/login-modal.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n    \n    <button ion-button  (click)="shareFeedBackEmail()">Share</button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content overflow-scroll="true">\n    <!-- <video controls="controls" preload="metadata" autoplay="autoplay" webkit-playsinline="webkit-playsinline" class="videoPlayer">\n     <source src="./assets/videos/Part_1.mp4" type="video/mp4" />\n    </video> -->\n<!-- \n    <ion-list>\n      <ion-item >\n        \n      </ion-item>  \n\n      \n    </ion-list>   -->\n\n    <ion-grid>\n        <ion-row>\n          <ion-col>\n              <button ion-button  (click)="fbLogin()"><ion-icon name="logo-facebook"></ion-icon> <span style="color:white"> Facebook</span></button>\n          </ion-col>\n          <ion-col>\n            <button ion-button color="danger" (click)="googleLogin()"><ion-icon name="logo-googleplus"></ion-icon> <span style="color:white">   Google</span></button> \n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    <!-- <h2>My Name is himanshu</h2> -->\n</ion-content>\n'/*ion-inline-end:"/Users/himanshu/NewsApp/NewsApp/src/pages/login-modal/login-modal.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]])
    ], Login);
    return Login;
}());

//# sourceMappingURL=login-modal.js.map

/***/ }),

/***/ 695:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Settings; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Settings = /** @class */ (function () {
    function Settings(navCtrl, platform) {
        this.navCtrl = navCtrl;
        platform.ready().then(function () {
        });
    }
    Settings = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"/Users/himanshu/NewsApp/NewsApp/src/pages/settings/settings.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n    \n    <button ion-button  (click)="shareFeedBackEmail()">Share</button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content overflow-scroll="true">\n    <!-- <video controls="controls" preload="metadata" autoplay="autoplay" webkit-playsinline="webkit-playsinline" class="videoPlayer">\n     <source src="./assets/videos/Part_1.mp4" type="video/mp4" />\n    </video> -->\n<!-- \n    <ion-list>\n      <ion-item >\n        \n      </ion-item>  \n\n      \n    </ion-list>   -->\n\n    <ion-grid>\n        <ion-row>\n          <ion-col>\n              <button ion-button  (click)="fbLogin()"><ion-icon name="logo-facebook"></ion-icon> <span style="color:white"> Facebook</span></button>\n          </ion-col>\n          <ion-col>\n            <button ion-button color="danger" (click)="googleLogin()"><ion-icon name="logo-googleplus"></ion-icon> <span style="color:white">   Google</span></button> \n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    <!-- <h2>My Name is himanshu</h2> -->\n</ion-content>\n'/*ion-inline-end:"/Users/himanshu/NewsApp/NewsApp/src/pages/settings/settings.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]])
    ], Settings);
    return Settings;
}());

//# sourceMappingURL=settings.js.map

/***/ })

},[357]);
//# sourceMappingURL=main.js.map