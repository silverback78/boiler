'use strict';

angular.module('boiler')

  .controller('howItWorksViewController', ['log', function(log) {
    log.setStack(boiler.enums.codeBlocks.controller, 'howItWorksViewController');
  }]);