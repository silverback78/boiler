'use strict';

var boilerMultipleChoice = function() {
  return {
    restrict: 'E',
    scope: {},
    controller: 'multipleChoiceController',
    controllerAs: 'vm',
    templateUrl: './src/components/study-widgets/multiple-choice/multiple-choice.template.html'
  };
};

boilerMultipleChoice.$inject = [];
angular.module('boiler').directive('boilerMultipleChoice', boilerMultipleChoice);