"use strict";angular.module("openbuildApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","chart.js","firebase"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/register",{templateUrl:"views/register.html",controller:"RegisterCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/dashboard",{templateUrl:"views/dashboard.html",controller:"DashboardCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("openbuildApp").controller("MainCtrl",["$scope",function(a){a.projectLabels=["Hardware","Hardcore CS","Service"],a.projectData=[2,3,5],a.projectOptions={animation:!1,showTooltips:!1},a.attendeeLabels=["Developer","Designer","Maker","Biz Dev","Strategist"],a.attendeeData=[22,4,1,4,2],a.attendeeOptions={animation:!1,showTooltips:!1}}]),angular.module("openbuildApp").factory("authService",["$firebaseAuth","$q",function(a,b){function c(a){var c=b.defer();return f.child("userRoles").child(a).once("value",function(a){null===a.val()?c.reject():c.resolve(a.val())}),c.promise}function d(a,c){var d=b.defer();return e(a,"attendee").then(function(){f.child("userProfiles").child(a).set(c,function(){d.resolve()})}),d.promise}function e(a,c){var d=b.defer();return f.child("userRoles").child(a).set(c,function(){d.resolve()}),d.promise}var f=new Firebase("https://openbuild.firebaseio.com/"),g=a(f),h=!1;g.$onAuth(function(a){h=a?!0:!1});var i={};return i.register=function(a,e,f){var h=b.defer();return g.$createUser({email:a,password:e}).then(function(){g.$authWithPassword({email:a,password:e}).then(function(a){c(a.uid).then(function(){h.reject()})["catch"](function(){d(a.uid,f).then(function(){h.resolve()})})})}),h.promise},i.isLoggedIn=function(){return h},i.login=function(a,d){var e=b.defer();return g.$authWithPassword({email:a,password:d}).then(function(a){c(a.uid).then(function(){e.resolve()})["catch"](function(){e.reject()})})["catch"](function(a){console.error("Authentication failed:",a)}),e.promise},i.logout=function(){g.$unauth()},i}]),angular.module("openbuildApp").controller("LoginCtrl",["$location","$scope","authService",function(a,b,c){b.$watch(c.isLoggedIn,function(){c.isLoggedIn()&&a.path("/dashboard")}),b.login=function(d){d&&c.login(b.email,b.password).then(function(){a.path("/dashboard")})["catch"](function(){a.path("/register")})}}]),angular.module("openbuildApp").controller("NavCtrl",["$scope","authService",function(a,b){a.$watch(b.isLoggedIn,function(){a.loggedIn=b.isLoggedIn()}),a.logout=function(){b.logout()}}]),angular.module("openbuildApp").controller("DashboardCtrl",["$location","$scope","authService",function(a,b,c){b.$watch(c.isLoggedIn,function(){c.isLoggedIn()||a.path("/login")})}]),angular.module("openbuildApp").controller("RegisterCtrl",["$location","$scope","authService",function(a,b,c){b.$watch(c.isLoggedIn,function(){c.isLoggedIn()&&a.path("/dashboard")}),b.register=function(d){if(d){var e={name:b.userName,email:b.email};c.register(b.email,b.password,e).then(function(){a.path("/dashboard")})["catch"](function(){a.path("/login")})}}}]);