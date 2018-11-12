'use strict';

var boilerSelectWidget = function() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: true,
    controller: 'selectWidgetController',
    controllerAs: 'vm',
    templateUrl: './src/components/study-widgets/select-widget/select-widget.template.html'
  };
};

boilerSelectWidget.$inject = [];
angular.module('boiler').directive('boilerSelectWidget', boilerSelectWidget);