'use strict';

var boilerSubmit = function() {
  return function ($scope, element, attrs) {
    element.bind('keydown keypress', (event) => {
      if (event.which === boiler.config.input.enterKey) {
        $scope.$apply(() => {
          $scope.$eval(attrs.boilerSubmit, {'event': event});
        });
        event.preventDefault();
      }
    });
  };
};

boilerSubmit.$inject = [];
angular.module('boiler').directive('boilerSubmit', boilerSubmit);