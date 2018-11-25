'use strict';

var boilerSequencerStep = function(log) {
  return {
    require: '^^boilerSequencer',
    restrict: 'E',
    transclude: true,
    scope: {
      nextLabel: '@',
      backLabel: '@',
      function1Enabled: '=',
      function1Label: '@',
      onFunction1: '&',
      onNext: '&',
      onBack: '&',
      onShow: '&'
    },
    link: ($scope, element, attrs, sequencerController) => {
      log.setStack(boiler.enums.codeBlocks.directive, ['boilerSequencerStep', 'link']);
      sequencerController.addStep($scope);
    },
    templateUrl: './src/components/sequencer/sequencer-step/sequencer-step.template.html'
  };
};

boilerSequencerStep.$inject = ['log'];
angular.module('boiler').directive('boilerSequencerStep', boilerSequencerStep);