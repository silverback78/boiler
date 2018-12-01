'use strict';

var selectWidgetController = function($routeParams, go, log) {
  log.setStack(boiler.enums.codeBlocks.controller, 'selectWidgetController');

  const vm = this;

  vm.username = $routeParams.username;
  vm.deck = $routeParams.deck;
  vm.category = $routeParams.category;
  vm.go = go;
};

selectWidgetController.$inject = ['$routeParams', 'go', 'log'];
angular.module('boiler').controller('selectWidgetController', selectWidgetController);