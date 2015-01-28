'use strict';

/**
 * @ngdoc service
 * @name openbuildApp.event
 * @description
 * # event
 * Service in the openbuildApp.
 */
angular.module('openbuildApp')
  .factory('eventService', function eventService($firebase, $q) {

    var ref = new Firebase('https://openbuild.firebaseio.com/events');
    var events =  $firebase(ref).$asArray();

    function formatEvent(event) {
      event.startDate = event.startDate.toJSON();
      event.endDate = event.endDate.toJSON();
      return event;
    }

    var service = {};

    service.getEvents = function() {
      return events;
    };

    service.addEvent = function(newEvent) {
      var formattedEvent = formatEvent(newEvent);
      var deferred = $q.defer();
      events.$add(formattedEvent)
        .then(function() {
          deferred.resolve();
        })
        .catch(function() {
          deferred.reject();
        });
      return deferred.promise;
    };

    service.updateEvent = function(index) {
      var deferred = $q.defer();
      events.$save(index)
        .then(function() {
          deferred.resolve();
        });
      return deferred.promise;
    };

    return service;

  });
