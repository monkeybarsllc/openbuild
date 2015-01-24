'use strict';

/**
 * @ngdoc function
 * @name openbuildApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the openbuildApp
 */
angular.module('openbuildApp')
  .controller('MainCtrl', function ($scope) {
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
    }
  });
