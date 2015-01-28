'use strict';

/**
 * @ngdoc function
 * @name openbuildApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the openbuildApp
 */
angular.module('openbuildApp')
  .controller('NavCtrl', function ($scope, authService, userService) {

    $scope.$watch(authService.isLoggedIn, function() {
      $scope.loggedIn = authService.isLoggedIn();
    });

    $scope.$watch(userService.getUser, function() {
      $scope.user = userService.getUser();
    });

    $scope.logout = function() {
      authService.logout();
    };

    $scope.userDropdown = [
      {
        'text': 'Profile',
        'href': '#/profile'
      },
      {
        'text': 'Logout',
        'click': 'logout()'
      }
    ];

  });
