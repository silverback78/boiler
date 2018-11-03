'use strict';

angular.module('boiler')
  .controller('cardListController', ['$routeParams', 'log', function($routeParams, log) {
    log.setStack(boiler.enums.codeBlocks.controller, 'cardListController');

    const vm = this;

    vm.username = $routeParams.username;
    vm.deck = $routeParams.deck;

  }]);
