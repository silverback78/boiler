'use strict';

angular.module('boiler')
  .directive('boilerSelectWidget', [() => {
    return {
      restrict: 'E',
      scope: {},
      bindToController: true,
      controller: 'selectWidgetController',
      controllerAs: 'vm',
      templateUrl: './src/components/study-widgets/select-widget/select-widget.template.html'
    };
  }]);