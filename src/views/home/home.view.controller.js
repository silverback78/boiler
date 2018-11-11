'use strict';

angular.module('boiler')

  .controller('homeViewController', ['go', 'log', 'user', function(go, log, user) {
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
  }]);