'use strict';

angular.module('boiler')
  .directive('boilerNavigation', [() => {
    return {
      restrict: 'E',
      scope: {},
      controller: 'navigationController',
      controllerAs: 'vm',
      templateUrl: './src/components/navigation/navigation.template.html'
    };
  }]);