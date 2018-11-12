'use strict';

var howItWorksViewController = function(log) {
  log.setStack(boiler.enums.codeBlocks.controller, 'howItWorksViewController');
};

howItWorksViewController.$inject = ['log'];
angular.module('boiler').controller('howItWorksViewController', howItWorksViewController);