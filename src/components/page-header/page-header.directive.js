'use strict';

var boilerPageHeader = function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    controller: 'pageHeaderController',
    controllerAs: 'vm',
    templateUrl: './src/components/page-header/page-header.template.html'
  };
};

boilerPageHeader.$inject = [];
angular.module('boiler').directive('boilerPageHeader', boilerPageHeader);