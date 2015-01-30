'use strict';

/**
 * @ngdoc overview
 * @name openbuildApp
 * @description
 * # openbuildApp
 *
 * Main module of the application.
 */
angular
  .module('openbuildApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'mgcrea.ngStrap',
    'chart.js',
    'firebase',
    'uiGmapgoogle-maps'
  ])
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyAZIkwd2AxmBp6qe2iVQnuv3gP4-NiYNVI',
      v: '3.18',
      libraries: 'places, circle'
    });
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/events/new', {
        templateUrl: 'views/newevent.html',
        controller: 'NeweventCtrl'
      })
      .when('/volunteer', {
        templateUrl: 'views/volunteer.html',
        controller: 'VolunteerCtrl'
      })
      .when('/attend', {
        templateUrl: 'views/attend.html',
        controller: 'AttendCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
