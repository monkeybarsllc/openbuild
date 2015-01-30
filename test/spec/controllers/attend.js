'use strict';

describe('Controller: AttendCtrl', function () {

  // load the controller's module
  beforeEach(module('openbuildApp'));

  var AttendCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AttendCtrl = $controller('AttendCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
