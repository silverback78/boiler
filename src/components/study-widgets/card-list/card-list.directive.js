'use strict';

angular.module('boiler')
  .directive('boilerCardList', [() => {
    return {
      restrict: 'E',
      scope: {
        user: '@',
        deck: '@'
      },
      controller: 'cardListController',
      controllerAs: 'vm',
      templateUrl: './src/components/study-widgets/card-list/card-list.template.html'
    };
  }]);