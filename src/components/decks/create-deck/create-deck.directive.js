'use strict';

var boilerCreateDeck = function(log) {
  return {
    restrict: 'E',
    scope: {
      createDeckId: '@',
      onSave: '&'
    },
    bindToController: true,
    link: ($scope) => {
      log.setStack(boiler.enums.codeBlocks.directive, ['boilerCreateDeck', 'link']);
      $scope.$parent.vm['child_' + $scope.vm.createDeckId] = $scope.vm;
    },
    controller: 'createDeckController',
    controllerAs: 'vm',
    templateUrl: './src/components/decks/create-deck/create-deck.template.html'
  };
};

boilerCreateDeck.$inject = ['log'];
angular.module('boiler').directive('boilerCreateDeck', boilerCreateDeck);