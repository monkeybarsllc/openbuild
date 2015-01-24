'use strict';

/**
 * @ngdoc function
 * @name openbuildApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the openbuildApp
 */
angular.module('openbuildApp')
  .controller('NavCtrl', function ($scope, authService) {
    $scope.$watch(authService.isLoggedIn, function() {
      $scope.loggedIn = authService.isLoggedIn();
    });

    $scope.logout = function() {
      authService.logout();
    };
  });
