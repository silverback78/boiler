'use strict';

var usersViewController = function($routeParams, log, user) {
  log.setStack(boiler.enums.codeBlocks.controller, 'usersViewController');

  const vm = this;

  vm.decks = [];
  vm.currentUser = user;
  vm.username = $routeParams.username;
  vm.containerSize = boiler.config.container.large;

  vm.refreshDecks = () => {
    vm.child_decksPager.getPage();
  };
};

usersViewController.$inject = ['$routeParams', 'log', 'user'];
angular.module('boiler').controller('usersViewController', usersViewController);