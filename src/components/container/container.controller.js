'use strict';

angular.module('boiler')
  .controller('containerController', ['log', function(log) {
    log.setStack(boiler.enums.codeBlocks.controller, 'containerController');

    const vm = this;
    vm.nav = false;
    vm.containerSize = boiler.config.container[vm.size] || boiler.config.container.large;
  }]);
