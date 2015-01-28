'use strict';

/**
 * @ngdoc service
 * @name openbuildApp.user
 * @description
 * # user
 * Service in the openbuildApp.
 */
angular.module('openbuildApp')
  .factory('userService', function userService($firebase, $q) {

    var ref = new Firebase('https://openbuild.firebaseio.com/userProfiles');
    var userObj;

    var service = {};

    service.setUser = function(userKey) {
      var deferred = $q.defer();
      userObj = $firebase(ref.child(userKey)).$asObject();
      userObj.$loaded()
        .then(function() {
          deferred.resolve();
        });
      return deferred.promise;
    };

    service.getUser = function() {
      return userObj;
    };

    service.getUserKey = function() {
      return userObj.$id;
    };

    service.updateUser = function() {
      var deferred = $q.defer();
      userObj.$save()
        .then(function() {
          deferred.resolve({
            'title': 'Updated!',
            'type': 'success'
          });
        })
        .catch(function(error) {
          deferred.reject({
            'title': 'Update failed! ',
            'content': error,
            'type': 'danger'
          });
        });
      return deferred.promise;
    };

    return service;

  });
