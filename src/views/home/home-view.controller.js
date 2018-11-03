'use strict';

angular.module('boiler')

  .controller('homeViewController', ['$location', 'api', 'log', 'user', function($location, api, log, user) {
    log.setStack(boiler.enums.codeBlocks.controller, 'homeViewController');

    const vm = this;
    vm.currentUser = user;
    vm.debounce = boiler.config.input.debounce;

    vm.refreshPagers = () => {
      vm.child_deckPager.getPage();
      vm.child_userPager.getPage();
    };

    vm.showLogin = () => {
      vm.child_login.showLogin();
    };
  }]);