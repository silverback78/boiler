'use strict';

var loginController = function($scope, api, authentication, go, log, user) {
  log.setStack(boiler.enums.codeBlocks.controller, 'loginController');

  const vm = this;
  vm.currentUser = user;
  vm.go = go;
  vm.state = {};
  vm.state = boiler.config.user.login.states.initial;

  vm.newUser = () => {
    log.setStack(boiler.enums.codeBlocks.controller, ['loginController', 'newUser()']);
    vm.child_createUser.showCreateUser();
  };

  vm.login = () => {
    if (!vm.username || !vm.password) return;
    log.setStack(boiler.enums.codeBlocks.controller, ['loginController', 'login()']);
    authentication.login(vm.username, vm.password)
      .then((user) => {
        if (user.authenticated) {
          vm.child_loginToast.showToast();
        }
        else {
          if (user.emailOnFile) {
            vm.state = boiler.config.user.login.states.authenticationFailedEmailOnFile;
          }
          else {
            vm.state = boiler.config.user.login.states.authenticationFailedNoEmailOnFile;
          }
        }
        $scope.$apply();
      });
  };

  vm.toastContent = () => {
    log.setStack(boiler.enums.codeBlocks.controller, ['loginController', 'toastContent()']);
    return 'Logged in as ' + vm.currentUser.username;
  };

  vm.logout = () => {
    log.setStack(boiler.enums.codeBlocks.controller, ['loginController', 'logout()']);
    authentication.logout();
  };

  vm.resetPassword = () => {
    log.setStack(boiler.enums.codeBlocks.controller, ['loginController', 'resetPassword()']);
    vm.code = String.empty;
    vm.newPassword = String.empty;
    vm.verifyPassword = String.empty;

    api.resetPassword(vm.username)
      .then((response) => {
        vm.email = response.data.obfuscatedEmail;
        vm.state = boiler.config.user.login.states.resetPassword;
      });
  };

  vm.updatePassword = () => {
    log.setStack(boiler.enums.codeBlocks.controller, ['loginController', 'updatePassword()']);
    if (vm.resetPasswordForm.$invalid) return;
    api.updateUser(vm.username, vm.code, vm.newPassword)
      .then((response) => {
        if (response.data.statusCode === boiler.config.errorStatus) {
          switch(response.data.referenceCode) {
          case boiler.config.user.invalidRecoveryCode:
            vm.state = boiler.config.user.login.states.invalidRecoveryCode;
            break;
          case boiler.config.user.expiredRecoveryCode:
            vm.state = boiler.config.user.login.states.expiredRecoveryCode;
            break;
          }
        }
        else {
          vm.state = boiler.config.user.login.states.changeSuccessful;
        }
      });
  };

  vm.tryAgain = () => {
    log.setStack(boiler.enums.codeBlocks.controller, ['loginController', 'tryAgain()']);
    vm.username = String.empty;
    vm.password = String.empty;
    vm.state = boiler.config.user.login.states.initial;
  };

  vm.tryResetAgain = () => {
    log.setStack(boiler.enums.codeBlocks.controller, ['loginController', 'tryResetAgain()']);
    vm.username = String.empty;
    vm.password = String.empty;
    vm.state = boiler.config.user.login.states.resetPassword;
  };
};

loginController.$inject = ['$scope', 'api', 'authentication', 'go', 'log', 'user'];
angular.module('boiler').controller('loginController', loginController);