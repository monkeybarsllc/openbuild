'use strict';

/**
 * @ngdoc function
 * @name openbuildApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the openbuildApp
 */
angular.module('openbuildApp')
  .controller('MainCtrl', function ($scope, eventService) {
    $scope.projectLabels = ['Hardware', 'Hardcore CS', 'Service'];
    $scope.projectData = [2, 3, 5];
    $scope.projectOptions = {
      animation: false,
      showTooltips: false
    };

    $scope.attendeeLabels = ['Developer', 'Designer', 'Maker', 'Biz Dev', 'Strategist'];
    $scope.attendeeData = [22, 4, 1, 4, 2];
    $scope.attendeeOptions = {
      animation: false,
      showTooltips: false
    };

    $scope.events = eventService.getEvents();
    $scope.selectedEvent = {
      selected: false
    };
    $scope.selectedIndex = null;

    $scope.selectEvent = function(event, index) {
      $scope.selectedEvent.selected = false;
      $scope.selectedEvent = event;
      $scope.selectedEvent.selected = true;
      $scope.selectedEvent.readonly = true;
      $scope.selectedIndex = index;
    };
  });
