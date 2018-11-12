'use strict';

angular.module('boiler')
  .controller('studyWidgetBaseController', ['$routeParams', '$scope', 'api', 'log', 'stash', 'vm', function($routeParams, $scope, api, log, stash, vm) {
    log.setStack(boiler.enums.codeBlocks.controller, 'studyWidgetBaseController');

    vm.goAgainPrimary = boiler.config.studyWidgets.base.goAgainClass;
    vm.progress = boiler.config.studyWidgets.base.defaultProgress;
    vm.defaultProgress = boiler.config.studyWidgets.base.defaultProgress;
    vm.negativeProgress = boiler.config.studyWidgets.base.defaultNegativeProgress;
    vm.defaultNegativeProgress = boiler.config.studyWidgets.base.defaultNegativeProgress;
    vm.exposure = boiler.config.studyWidgets.base.defaultExposure;
    vm.penalty = boiler.config.studyWidgets.base.defaultPenalty;
    vm.step = boiler.config.studyWidgets.base.defaultStep;
    vm.successMessages = boiler.config.studyWidgets.base.successMessages;
    vm.failureMessages = boiler.config.studyWidgets.base.failureMessages;
    vm.failureMessage = String.empty;
    vm.successMessage = String.empty;
    vm.currentCardId;
    vm.complete = false;
    vm.passed = false;
    vm.failed = false;
    vm.baseUrl = boiler.config.baseUrl;

    vm.originalCards = [];
    vm.missedCards = [];
    vm.currentCards = [];

    vm.username = $routeParams.username;
    vm.deck = $routeParams.deck;
    vm.childRegistered = false;

    const unwatchChildRegistered = $scope.$watch('$scope.vm.childRegistered', () => {
      log.setStack(boiler.enums.codeBlocks.directive, ['studyWidgetBaseController', '$scope.$watch($scope.vm.childRegistered)']);
      if (vm.childRegistered) {
        vm.initialize();
      }
      else {
        log.error('Child study widget was not registered.');
      }
      unwatchChildRegistered();
    });

    vm.initialize = () => {
      log.setStack(boiler.enums.codeBlocks.controller, ['studyWidgetBaseController', 'vm.initialize()']);
      let stashedCards = stash.get(vm.username + vm.deck);

      if (stashedCards) {
        log.debug('Getting cards from stash.');
        vm.originalCards = stashedCards;
        vm.studyAll();
      }
      else {
        api.getCardsByDeck(vm.username, vm.deck)
          .then((response) => {
            log.debug('Getting cards from server.');
            vm.originalCards = response.data.page.items;
            stash.set(vm.username + vm.deck, vm.originalCards);
            vm.studyAll();
          });
      }
    };

    vm.studyAll = () => {
      log.setStack(boiler.enums.codeBlocks.controller, ['studyWidgetBaseController', 'vm.studyAll()']);

      if (angular.isFunction(vm.onStudyAll)) {
        vm.onStudyAll();
      }

      vm.currentCards = vm.originalCards;
      vm.initializeRound();
    };

    vm.studyMissed = () => {
      log.setStack(boiler.enums.codeBlocks.controller, ['studyWidgetBaseController', 'vm.studyMissed()']);

      if (angular.isFunction(vm.onStudyMissed)) {
        vm.onStudyMissed();
      }

      vm.currentCards = vm.missedCards;
      vm.initializeRound();
    };

    vm.initializeRound = () => {
      log.setStack(boiler.enums.codeBlocks.controller, ['studyWidgetBaseController', 'vm.initializeRound()']);

      if (angular.isFunction(vm.onInitializeRound)) {
        vm.onInitializeRound();
      }

      vm.complete = false;
      vm.passed = false;
      vm.failed = false;
      vm.progress = vm.defaultProgress;
      vm.negativeProgress = vm.defaultNegativeProgress;
      vm.step = Number.percentMax / vm.currentCards.length;
      vm.missedCards = [];

      vm.currentCards.map((card, index) => {
        card.exposure = vm.exposure;
        card.originalId = card.originalId || card.id;
        card.id = index;
      });

      vm.chooseNextCard();
    };

    vm.chooseNextCard = () => {
      log.setStack(boiler.enums.codeBlocks.controller, ['studyWidgetBaseController', 'vm.chooseNextCard()']);

      if (angular.isFunction(vm.onChooseNextCard)) {
        vm.onChooseNextCard();
      }

      let remainingCards = vm.currentCards.filter(card => card.exposure > Number.zero);

      if (vm.negativeProgress < Number.zero) {
        vm.failureMessage = vm.failureMessages.chooseRandom();
        vm.complete = true;
        vm.failed = true;
      }

      if (remainingCards.length > Number.zero) {
        let randomCard = remainingCards.chooseRandom();
        vm.currentCardId = randomCard.id;
      }
      else {
        vm.successMessage = vm.successMessages.chooseRandom();
        vm.passed = true;
        vm.complete = true;
      }

      if (angular.isFunction(vm.onChooseNextCardComplete)) {
        vm.onChooseNextCardComplete();
      }
    };

    vm.updateProgress = (correct) => {
      log.setStack(boiler.enums.codeBlocks.controller, ['studyWidgetBaseController', 'vm.updateProgress(' + correct + ')']);

      if (angular.isFunction(vm.onUpdateProgress)) {
        vm.onUpdateProgress();
      }

      if (correct) {
        vm.currentCards[vm.currentCardId].exposure--;
        vm.progress = vm.progress + vm.step;
      }
      else {
        vm.currentCards[vm.currentCardId].exposure =vm.currentCards[vm.currentCardId].exposure + vm.penalty;
        vm.progress = vm.progress - (vm.step * vm.penalty);
      }

      if (vm.progress < Number.zero || vm.negativeProgress < vm.defaultNegativeProgress) {
        vm.negativeProgress = vm.progress + vm.defaultNegativeProgress;
        vm.negativeProgress = vm.negativeProgress === Number.zero
          ? Number.one
          : vm.negativeProgress;
        log.debug('vm.negativeProgress', vm.negativeProgress);
      }

      log.debug('vm.progress', vm.progress);
    };

    vm.next = (correct) => {
      log.setStack(boiler.enums.codeBlocks.controller, ['studyWidgetBaseController', 'vm.next(' + correct + ')']);

      if (angular.isFunction(vm.onNext)) {
        vm.onNext();
      }

      if (!correct && !vm.missedCards.find(obj => obj.id === vm.currentCardId)) {
        vm.missedCards.push(vm.currentCards[vm.currentCardId]);
      }

      if (vm.complete) return;
      vm.updateProgress(correct);
      vm.chooseNextCard();
    };
  }]);
