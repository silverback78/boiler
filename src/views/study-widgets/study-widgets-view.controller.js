'use strict';

angular.module('boiler')

  .controller('studyWidgetsViewController', ['$routeParams', 'go', 'log', function($routeParams, go, log) {
    log.setStack(boiler.enums.codeBlocks.controller, 'studyWidgetsViewController');

    const vm = this;

    vm.username = $routeParams.username;
    vm.deck = $routeParams.deck;
    vm.widget = $routeParams.widget;
    vm.go = go;
  }]);