'use strict';

angular.module('boiler')
  .controller('pageHeaderController', ['log', function(log) {
    log.setStack(boiler.enums.codeBlocks.controller, 'pageHeaderController');

    const vm = this;
    vm.containerSize = boiler.config.container.large;
  }]);
