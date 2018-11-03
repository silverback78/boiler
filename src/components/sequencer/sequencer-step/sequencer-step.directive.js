'use strict';

angular.module('boiler')
  .directive('boilerSequencerStep', ['log', (log) => {
    return {
      require: '^^boilerSequencer',
      restrict: 'E',
      transclude: true,
      scope: {
        nextLabel: '@',
        backLabel: '@',
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
  }]);