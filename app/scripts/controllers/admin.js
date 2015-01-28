'use strict';

/**
 * @ngdoc function
 * @name openbuildApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the openbuildApp
 */
angular.module('openbuildApp')
  .controller('AdminCtrl', function ($location, $filter, $scope, authService, eventService) {

    $scope.$watch(authService.isLoggedIn, function() {
      if (!authService.isLoggedIn()) {
        $location.path('/login');
      }
      if (!authService.isAdmin) {
        $location.path('/dashboard');
      }
    });

    $scope.events = eventService.getEvents();
    $scope.selectedEvent = {
      selected: false
    };
    $scope.selectedIndex = null;

    $scope.addDateToSchedule = function() {
      var index = null;
      if (!$scope.selectedEvent.schedule) {
        $scope.selectedEvent.schedule = {};
        index = 0;
      } else {
        index = Object.keys($scope.selectedEvent.schedule).length;
      }
      $scope.selectedEvent.schedule[index] = {
        date: $scope.newDate.toJSON()
      };
      $scope.newDate = null;
    };

    $scope.addScheduleItem = function(day, newTime) {
      var index = null;
      if (!day.items) {
        day.items = {};
        index = 0;
      } else {
        index = Object.keys(day.items).length;
      }
      day.items[index] = {
        time: newTime.time.toJSON(),
        description: newTime.description
      }
    };

    $scope.editEvent = function() {
      $scope.selectedEvent.readonly = $scope.selectedEvent.readonly == false;
    };

    $scope.selectEvent = function(event, index) {
      $scope.selectedEvent.selected = false;
      $scope.selectedEvent = event;
      $scope.selectedEvent.selected = true;
      $scope.selectedEvent.readonly = true;
      $scope.selectedIndex = index;
    };

    $scope.updateEvent = function(isValid) {
      if (isValid) {
        eventService.updateEvent($scope.selectedIndex)
          .then(function() {
            $scope.selectedEvent.readonly = true;
          })
      };
    };

    $scope.updateScheduleItem = function(item) {
      item.time = item.time.toJSON();
      item.edit = !item.edit;
    }

  });
