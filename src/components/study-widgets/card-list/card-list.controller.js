'use strict';

angular.module('boiler')
  .controller('cardListController', ['$controller', '$routeParams', '$scope', 'api', 'log', function($controller, $routeParams, $scope, api, log) {
    log.setStack(boiler.enums.codeBlocks.controller, 'cardListController');

    const vm = this;
    $controller('studyWidgetBaseController', { $routeParams: $routeParams, $scope: $scope, api: api, log: log, vm: vm });

    vm.username = $routeParams.username;
    vm.deck = $routeParams.deck;

    vm.flipCard = (index) => {
      log.setStack(boiler.enums.codeBlocks.controller, ['cardListController', 'vm.flipCard(' + index + ')']);
      vm.originalCards[index].flipped = !vm.originalCards[index].flipped;
    };

    vm.flipAll = () => {
      vm.originalCards.map(card => {
        card.flipped = !card.flipped;
      });
    };

    vm.childRegistered = true;
  }]);
