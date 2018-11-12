'use strict';

var recentViewController = function(log) {
  log.setStack(boiler.enums.codeBlocks.controller, 'recentViewController');
};

recentViewController.$inject = ['log'];
angular.module('boiler').controller('recentViewController', recentViewController);