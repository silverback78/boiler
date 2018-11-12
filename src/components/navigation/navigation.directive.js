'use strict';

var boilerNavigation = function() {
  return {
    restrict: 'E',
    scope: {},
    controller: 'navigationController',
    controllerAs: 'vm',
    templateUrl: './src/components/navigation/navigation.template.html'
  };
};

boilerNavigation.$inject = [];
angular.module('boiler').directive('boilerNavigation', boilerNavigation);