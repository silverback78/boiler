'use strict';

angular.module('boiler')
  .controller('loginController', ['$scope', 'api', 'authentication', 'go', 'log', 'spinner', 'user', function($scope, api, authentication, go, log, spinner, user) {
    log.setStack(boiler.enums.codeBlocks.controller, 'loginController');

    const vm = this;
    vm.currentUser = user;
    vm.go = go;
    vm.state = {};
    vm.state = boiler.config.user.login.states.initial;
    vm.spinner = spinner;

    vm.newUser = () => {
      vm.child_createUser.showCreateUser();
    };

    vm.login = () => {
      vm.spinner.active = true;
      authentication.login(vm.username, vm.password)
        .then((user) => {
          vm.spinner.active = false;
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
      return 'Logged in as ' + vm.currentUser.username;
    };

    vm.logout = () => {
      authentication.logout();
    };

    vm.resetPassword = () => {
      vm.code = String.empty;
      vm.newPassword = String.empty;
      vm.verifyPassword = String.empty;
      vm.spinner.active = true;

      log.setStack(boiler.enums.codeBlocks.service, ['resetPassword', 'api.resetPassword(' + vm.username + ')']);
      api.resetPassword(vm.username)
        .then((response) => {
          vm.spinner.active = false;
          log.setStack(boiler.enums.codeBlocks.service, ['resetPassword', 'api.resetPassword(' + vm.username + ').then()']);
          log.debug('response.data', response.data);
          vm.email = response.data.email;
          vm.state = boiler.config.user.login.states.resetPassword;
        });
    };

    vm.updatePassword = () => {
      if (vm.resetPasswordForm.$invalid) return;
      vm.spinner.active = true;
      log.setStack(boiler.enums.codeBlocks.service, ['updatePassword', 'api.updatePassword(' + vm.username + ', ' + vm.code + ', ' + vm.newPassword + ')']);
      api.updatePassword(vm.username, vm.code, vm.newPassword)
        .then((response) => {
          vm.spinner.active = false;
          log.setStack(boiler.enums.codeBlocks.service, ['updatePassword', 'api.updatePassword(' + vm.username + ', ' + vm.code + ', ' + vm.newPassword + ').then()']);
          log.debug('response.data', response.data);

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
      vm.username = String.empty;
      vm.password = String.empty;
      vm.state = boiler.config.user.login.states.initial;
    };

    vm.tryResetAgain = () => {
      vm.username = String.empty;
      vm.password = String.empty;
      vm.state = boiler.config.user.login.states.resetPassword;
    };
  }]);
