'use strict';

angular.module('boiler')
  .controller('studyWidgetBaseController', ['$routeParams', 'api', 'log', 'vm', function($routeParams, api, log, vm) {
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

    vm.initialize = () => {
      api.getCardsByDeck(vm.username, vm.deck)
        .then((response) => {
          log.setStack(boiler.enums.codeBlocks.controller, ['studyWidgetBaseController', 'api.initializeByDeck(' + vm.username + ', ' + vm.deck + ').then()']);
          log.debug('response', response);
          vm.originalCards = response.data.page.items;
          vm.studyAll();
        })
        .catch(() => {
          log.setStack(boiler.enums.codeBlocks.controller, 'studyWidgetBaseController', 'api.initializeByDeck(' + vm.username + ', ' + vm.deck +').catch()');
          log.error(boiler.config.verbiage.defaultCatchMessage);
        });
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

    vm.initialize();
  }]);
