'use strict';

angular.module('boiler')
  .directive('boilerMultipleChoice', [() => {
    return {
      restrict: 'E',
      scope: {},
      controller: 'multipleChoiceController',
      controllerAs: 'vm',
      templateUrl: './src/components/study-widgets/multiple-choice/multiple-choice.template.html'
    };
  }]);