'use strict';

var demoViewController = function(log) {
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
};

demoViewController.$inject = ['log'];
angular.module('boiler').controller('demoViewController', demoViewController);