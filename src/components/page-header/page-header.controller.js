'use strict';

var pageHeaderController = function(log) {
  log.setStack(boiler.enums.codeBlocks.controller, 'pageHeaderController');

  const vm = this;
  vm.containerSize = boiler.config.container.large;
};

pageHeaderController.$inject = ['log'];
angular.module('boiler').controller('pageHeaderController', pageHeaderController);
