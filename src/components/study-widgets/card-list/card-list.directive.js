'use strict';

var cardListController = function() {
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
};

cardListController.$inject = [];
angular.module('boiler').directive('boilerCardList', cardListController);