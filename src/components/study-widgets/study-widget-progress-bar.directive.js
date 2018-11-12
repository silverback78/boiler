'use strict';

var studyWidgetsProgressBar = function() {
  return {
    restrict: 'E',
    scope: {
      negativeProgress: '=',
      progress: '='
    },
    bindToController: true,
    controller: () => {},
    controllerAs: 'vm',
    template: '<div layout="row" class="boiler-progress"><div flex><md-progress-linear md-mode="determinate" class="md-accent" value="{{vm.negativeProgress}}"></md-progress-linear></div><div flex><md-progress-linear md-mode="determinate" class="md-primary" value="{{vm.progress}}"></md-progress-linear></div></div>'
  };
};

studyWidgetsProgressBar.$inject = [];
angular.module('boiler').directive('studyWidgetsProgressBar', studyWidgetsProgressBar);