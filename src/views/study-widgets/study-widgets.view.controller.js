'use strict';

var studyWidgetsViewController = function($routeParams, go, log, user) {
  log.setStack(boiler.enums.codeBlocks.controller, 'studyWidgetsViewController');

  const vm = this;

  vm.currentUser = user;
  vm.username = $routeParams.username;
  vm.deck = $routeParams.deck;
  vm.widget = $routeParams.widget;
  vm.go = go;
};

studyWidgetsViewController.$inject = ['$routeParams', 'go', 'log', 'user'];
angular.module('boiler').controller('studyWidgetsViewController', studyWidgetsViewController);