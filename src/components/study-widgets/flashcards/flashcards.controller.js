'use strict';

angular.module('boiler')
  .controller('flashcardsController', ['$controller', '$routeParams', '$scope', 'api', 'log', function($controller, $routeParams, $scope, api, log) {
    log.setStack(boiler.enums.codeBlocks.controller, 'flashcardsController');

    const vm = this;
    $controller('studyWidgetBaseController', { $routeParams: $routeParams, $scope: $scope, api: api, log: log, vm: vm });

    vm.cardFlipped = false;

    vm.flipCard = () => {
      log.setStack(boiler.enums.codeBlocks.controller, ['flashcardsController', 'vm.flipCard()']);
      vm.cardFlipped = !vm.cardFlipped;
    };

    vm.onChooseNextCard = () => {
      log.setStack(boiler.enums.codeBlocks.controller, ['flashcardsController', 'vm.onChooseNextCard()']);
      vm.cardFlipped = false;
    };
  }]);
