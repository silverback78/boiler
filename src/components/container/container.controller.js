'use strict';

var containerController = function(log) {
  log.setStack(boiler.enums.codeBlocks.controller, 'containerController');

  const vm = this;
  vm.nav = false;
  vm.containerSize = boiler.config.container[vm.size] || boiler.config.container.large;
};

containerController.$inject = ['log'];
angular.module('boiler').controller('containerController', containerController);