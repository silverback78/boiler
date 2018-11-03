'use strict';

angular.module('boiler')
  .controller('containerController', ['log', function(log) {
    log.setStack(boiler.enums.codeBlocks.controller, 'containerController');

    const vm = this;
    vm.containerTheme = boiler.config.container.defaultTheme;
    vm.backgroundColor = boiler.config.container.defaultBackgroundColor;
    vm.nav = false;

  }]);
