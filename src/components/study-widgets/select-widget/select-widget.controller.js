'use strict';

angular.module('boiler')
  .controller('selectWidgetController', ['$routeParams', 'go', 'log', function($routeParams, go, log) {
    log.setStack(boiler.enums.codeBlocks.controller, 'selectWidgetController');

    const vm = this;

    vm.username = $routeParams.username;
    vm.deck = $routeParams.deck;
    vm.go = go;
  }]);
