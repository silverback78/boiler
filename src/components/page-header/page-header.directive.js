'use strict';

angular.module('boiler')
  .directive('boilerPageHeader', [() => {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: 'pageHeaderController',
      controllerAs: 'vm',
      templateUrl: './src/components/page-header/page-header.template.html'
    };
  }]);