'use strict';

/**
 * @ngdoc service
 * @name openbuildApp.auth
 * @description
 * # auth
 * Service in the openbuildApp.
 */
angular.module('openbuildApp')
  .factory('authService', function authService($firebaseAuth, $q) {

    var ref = new Firebase('https://openbuild.firebaseio.com/');
    var authObj = $firebaseAuth(ref);
    var loggedIn = false;

    authObj.$onAuth(function(authData) {
      loggedIn = authData ? true : false;
    });

    function authCheck(providerUid) {
      var deferred = $q.defer();
      ref.child('userRoles').child(providerUid).once('value', function(snapshot) {
        if (snapshot.val() === null) { deferred.reject(); }
        else { deferred.resolve(snapshot.val()); }
      });
      return deferred.promise;
    }

    function addNewUserProfile(uid, userInfo) {
      var deferred = $q.defer();
      updateRoles(uid, 'attendee')
        .then(function() {
          ref.child('userProfiles').child(uid).set(userInfo, function() {
            deferred.resolve();
          });
        });
      return deferred.promise;
    }

    function updateRoles(uid, role) {
      var deferred = $q.defer();
      ref.child('userRoles').child(uid).set(role, function() {
        deferred.resolve();
      });
      return deferred.promise;
    }

    var service = {};

    service.register = function(email, password, userInfo) {
      var deferred = $q.defer();
      authObj.$createUser({
        email:    email,
        password: password
      }).then(function() {
        authObj.$authWithPassword({
          email:    email,
          password: password
        }).then(function(authData) {
          authCheck(authData.uid)
            .then(function() {
              deferred.reject();
            })
            .catch(function() {
              addNewUserProfile(authData.uid, userInfo)
                .then(function() {
                  deferred.resolve();
                });
            });
        });
      });
      return deferred.promise;
    };

    service.isLoggedIn = function() {
      return loggedIn;
    };

    service.login = function(email, password) {
      var deferred = $q.defer();
      authObj.$authWithPassword({
        email: email,
        password: password
      })
        .then(function(authData) {
          authCheck(authData.uid)
            .then(function() {
              deferred.resolve();
            })
            .catch(function() {
              deferred.reject();
            })
        })
        .catch(function(error) {
          console.error('Authentication failed:', error);
        });
      return deferred.promise;
    };

    service.logout = function() {
      authObj.$unauth();
    };

    return service;

  });
