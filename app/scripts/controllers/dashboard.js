'use strict';

/**
 * @ngdoc function
 * @name openbuildApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the openbuildApp
 */
angular.module('openbuildApp')
  .controller('DashboardCtrl', function ($location, $scope, authService) {

    $scope.$watch(authService.isLoggedIn, function() {
      if (!authService.isLoggedIn()) {
        $location.path('/login');
      }
    });

  });
