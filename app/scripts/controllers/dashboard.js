'use strict';

/**
 * @ngdoc function
 * @name openbuildApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the openbuildApp
 */
angular.module('openbuildApp')
  .controller('DashboardCtrl', function ($location, $scope, authService, userService) {

    $scope.$watch(authService.isLoggedIn, function() {
      if (!authService.isLoggedIn()) {
        $location.path('/login');
      } else {
        if (authService.isAdmin) {
          $location.path('/admin');
        }
      }
    });

    $scope.$watch(userService.getUser, function() {
      $scope.user = userService.getUser();
    });

  });
