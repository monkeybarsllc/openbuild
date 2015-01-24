'use strict';

/**
 * @ngdoc function
 * @name openbuildApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the openbuildApp
 */
angular.module('openbuildApp')
  .controller('RegisterCtrl', function ($location, $scope, authService) {

    $scope.$watch(authService.isLoggedIn, function() {
      if (authService.isLoggedIn()) {
        $location.path('/dashboard');
      }
    });

    $scope.register = function(isValid) {
      if (isValid) {
        var userInfo = {
          name: $scope.userName,
          email: $scope.email
        };
        authService.register($scope.email, $scope.password, userInfo)
          .then(function() {
            $location.path('/dashboard');
          })
          .catch(function() {
            $location.path('/login');
          });
      }
    };

  });
