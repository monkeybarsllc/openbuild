'use strict';

/**
 * @ngdoc function
 * @name openbuildApp.controller:NeweventCtrl
 * @description
 * # NeweventCtrl
 * Controller of the openbuildApp
 */
angular.module('openbuildApp')
  .controller('NeweventCtrl', function ($location, $scope, uiGmapGoogleMapApi, authService, eventService) {

    $scope.$watch(authService.isLoggedIn, function() {
      if (!authService.isLoggedIn()) {
        $location.path('/login');
      }
      if (!authService.isAdmin) {
        $location.path('/dashboard');
      }
    });

    var events = {
      places_changed: function(searchbox) {
        var places = searchbox.getPlaces();
        $scope.map = {
          center: {
            latitude:   places[0].geometry.location.lat(),
            longitude:  places[0].geometry.location.lng()
          },
          zoom: 15
        };
        $scope.marker = {
          id: 0,
          coords: {
            latitude:   places[0].geometry.location.lat(),
            longitude:  places[0].geometry.location.lng()
          },
          options: { draggable: false }
        };
        $scope.event.venue = {
          googleId: 		places[0].id,
          placeId: 			places[0].place_id,
          name: 				places[0].name,
          address: 			places[0].formatted_address,
          htmlAddress: 	places[0].adr_address,
          coords: {
            latitude: 	places[0].geometry.location.lat(),
            longitude: 	places[0].geometry.location.lng()
          }
        };
      }
    };

    $scope.map = { center: { latitude: 40.1451, longitude: -99.6680 }, zoom: 3 };
    $scope.searchbox  = { template:'searchbox.tpl.html', events: events, options: {} };
    $scope.marker = { id: 0 };

    $scope.event = {};

    uiGmapGoogleMapApi
      .then(function() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position){

            var geolocation = new google.maps.LatLng(
              position.coords.latitude, position.coords.longitude);
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });

            $scope.$apply(function(){
              $scope.searchbox.options = circle.getBounds();
              $scope.map= {
                center: {
                  latitude:   position.coords.latitude,
                  longitude:  position.coords.longitude
                },
                zoom: 10
              };
            });
          });
        }
      });

    $scope.createEvent = function(isValid) {
      if (isValid) {
        eventService.addEvent($scope.event)
          .then(function() {
            $location.path('/admin');
          });
      }
    };

  });
