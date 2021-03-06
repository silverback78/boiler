'use strict';

var multipleChoiceController = function($controller, $routeParams, $scope, api, log) {
  log.setStack(boiler.enums.codeBlocks.controller, 'multipleChoiceController');

  const vm = this;
  $controller('studyWidgetBaseController', { $routeParams: $routeParams, $scope: $scope, api: api, log: log, vm: vm });

  vm.defaultNumberOfChoices = boiler.config.studyWidgets.multipleChoice.numberOfChoices;

  vm.onChooseNextCard = () => {
    log.setStack(boiler.enums.codeBlocks.controller, ['multipleChoiceController', 'vm.onChooseNextCard()']);
    vm.answered = String.empty;
    vm.answer = {};
  };

  vm.onChooseNextCardComplete = () => {
    log.setStack(boiler.enums.codeBlocks.controller, ['multipleChoiceController', 'vm.onChooseNextCardComplete()']);
    if (vm.complete) return;

    let choices = [];

    const numberOfChoices = vm.originalCards.length > vm.defaultNumberOfChoices
      ? vm.defaultNumberOfChoices
      : vm.originalCards.length;

    log.debug('numberOfChoices', numberOfChoices);

    const correctAnswer = vm.currentCards[vm.currentCardId];
    correctAnswer.correct = true;
    choices.push(correctAnswer);

    while (choices.length < numberOfChoices) {
      const randomCard = vm.originalCards.chooseRandom();
      if (!choices.find(card => card.originalId === randomCard.originalId)) {
        randomCard.correct = false;
        choices.push(randomCard);
      }
    }
    choices = choices.shuffle();

    vm.choices = choices;
    log.debug('vm.choices', vm.choices);
  };

  vm.childRegistered = true;
};

multipleChoiceController.$inject = ['$controller', '$routeParams', '$scope', 'api', 'log'];
angular.module('boiler').controller('multipleChoiceController', multipleChoiceController);