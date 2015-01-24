'use strict';

/**
 * @ngdoc function
 * @name openbuildApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the openbuildApp
 */
angular.module('openbuildApp')
  .controller('LoginCtrl', function ($location, $scope, authService) {

    $scope.$watch(authService.isLoggedIn, function() {
      if (authService.isLoggedIn()) {
        $location.path('/dashboard');
      }
    });

    $scope.login = function(isValid) {
      if (isValid) {
        authService.login($scope.email, $scope.password)
          .then(function() {
            $location.path('/dashboard');
          })
          .catch(function() {
            $location.path('/register');
          });
      }
    };

  });
