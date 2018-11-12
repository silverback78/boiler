'use strict';

var homeViewController = function(go, log, user) {
  log.setStack(boiler.enums.codeBlocks.controller, 'homeViewController');

  const vm = this;
  vm.currentUser = user;
  vm.debounce = boiler.config.input.debounce;
  vm.go = go;

  vm.refreshPagers = () => {
    vm.child_deckPager.getPage();
    vm.child_userPager.getPage();
  };

  vm.showLogin = () => {
    vm.child_login.showLogin();
  };
};

homeViewController.$inject = ['go', 'log', 'user'];
angular.module('boiler').controller('homeViewController', homeViewController);