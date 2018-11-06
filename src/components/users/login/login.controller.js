'use strict';

angular.module('boiler')
  .controller('loginController', ['authentication', 'go', 'log', 'user', function(authentication, go, log, user) {
    log.setStack(boiler.enums.codeBlocks.controller, 'loginController');

    const vm = this;
    vm.currentUser = user;
    vm.go = go;

    vm.newUser = () => {
      vm.child_createUser.showCreateUser();
    };

    vm.login = () => {
      authentication.login(vm.username, vm.password)
        .then(() => {
          vm.child_loginToast.showToast();
        });
    };

    vm.toastContent = () => {
      return 'Logged in as ' + vm.currentUser.username;
    };

    vm.logout = () => {
      authentication.logout();
    };
  }]);
