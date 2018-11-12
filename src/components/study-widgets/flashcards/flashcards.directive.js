'use strict';

var boilerFlashcards = function() {
  return {
    restrict: 'E',
    scope: {},
    controller: 'flashcardsController',
    controllerAs: 'vm',
    templateUrl: './src/components/study-widgets/flashcards/flashcards.template.html'
  };
};

boilerFlashcards.$inject = [];
angular.module('boiler').directive('boilerFlashcards', boilerFlashcards);