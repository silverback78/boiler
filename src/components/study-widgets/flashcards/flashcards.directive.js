'use strict';

angular.module('boiler')
  .directive('boilerFlashcards', [() => {
    return {
      restrict: 'E',
      scope: {},
      controller: 'flashcardsController',
      controllerAs: 'vm',
      templateUrl: './src/components/study-widgets/flashcards/flashcards.template.html'
    };
  }]);