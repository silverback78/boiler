'use strict';

angular.module('boiler')

  .controller('demoViewController', ['log', function(log) {
    log.setStack(boiler.enums.codeBlocks.controller, 'demoViewController');

    const vm = this;

    vm.paletteIndexes = [
      '50',
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
      'A100',
      'A200',
      'A400',
      'A700'
    ];
  }]);