'use strict';

angular.module('boiler')

  .controller('createUserController', ['$scope', 'api', 'authentication', 'go', 'log', 'user', function($scope, api, authentication, go, log, user) {
    log.setStack(boiler.enums.codeBlocks.controller, 'createUserController');

    const vm = this;

    vm.form = {};
    vm.form.username = String.empty;
    vm.form.password = String.empty;
    vm.form.verifyPassword = String.empty;
    vm.form.passwordHint = String.empty;
    vm.reCaptchaResponse = String.empty;
    vm.form.nameAvailable = String.empty;

    vm.checkingName = String.empty;
    vm.debounce = boiler.config.input.debounce;
    vm.saveError = false;
    vm.currentUser = user;

    vm.showCreateUser = () => {
      log.setStack(boiler.enums.codeBlocks.controller, ['createUserController', 'vm.showCreateUser()']);
      vm.child_createUser.showSequencer();
    };

    vm.hideCreateUser = () => {
      log.setStack(boiler.enums.codeBlocks.controller, ['createUserController', 'vm.hideCreateUser()']);
      vm.child_createUser.hideSequencer();
    };

    vm.getStarted = () => {
      go.toUser(vm.currentUser.username);
    };

    vm.validateName = () => {
      log.setStack(boiler.enums.codeBlocks.controller, ['createUserController', 'vm.validateName()']);
      log.debug('vm.form.username', vm.form.username);
      vm.checkingName = String.empty;
      if (vm.form.username) {
        vm.checkingName = boiler.config.input.asyncState.checking;
        log.setStack(boiler.enums.codeBlocks.controller, ['createUserController', 'api.isUsernameAvailable(' + vm.form.username + ')']);
        api.isUsernameAvailable(vm.form.username)
          .then((response) => {
            log.setStack(boiler.enums.codeBlocks.controller, ['createUserController', 'api.isUsernameAvailable(' + vm.form.username + ').then()']);
            log.debug('response', response);
            let available = response.data;
            if (available) {
              vm.checkingName = boiler.config.input.asyncState.available;
              vm.form.nameAvailable = vm.form.username;
            }
            else {
              vm.checkingName = boiler.config.input.asyncState.unavailable;
              vm.form.nameAvailable = String.empty;
            }
          })
          .catch(() => {
            log.setStack(boiler.enums.codeBlocks.controller, ['createUserController', 'api.isUsernameAvailable(' + vm.form.username + ').catch()']);
            log.error(boiler.config.verbiage.defaultCatchMessage);
          });
      }
    };

    $scope.$watch('vm.form.username', vm.validateName);

    vm.save = () => {
      log.setStack(boiler.enums.codeBlocks.controller, ['createUserController', 'vm.save()']);
      log.setStack(boiler.enums.codeBlocks.controller, ['createUserController', 'api.createUser(' + vm.form.username + ', ' + vm.form.password + ', ' + vm.form.passwordHint + ', ' + vm.reCaptchaResponse + ')']);
      api.createUser(vm.form.username, vm.form.password, vm.form.passwordHint, vm.reCaptchaResponse)
        .then((response) => {
          log.setStack(boiler.enums.codeBlocks.controller, ['createUserController', 'api.createUser(' + vm.form.username + ', ' + vm.form.password + ', ' + vm.form.passwordHint + ', ' + vm.reCaptchaResponse + ').then()']);
          log.debug('response', response);
          const data = response.data;

          if (data.statusCode === boiler.config.errorStatus) {
            log.setStack(boiler.enums.codeBlocks.controller, ['createUserController', 'vm.save()', 'Error']);
            log.debug('data.statusCode', data.statusCode);
            switch(data.referenceCode) {
            case boiler.config.user.captchaErrorCode:
              vm.child_captchaErrorDialog.showDialog();
              break;

            default:
              vm.child_validationErrorDialog.showDialog();
              break;
            }

            vm.saveError = true;
          }
          else {
            authentication.login(vm.form.username, vm.form.password);
          }

          vm.form.username = String.empty;
          vm.form.password = String.empty;
          vm.form.passwordHint = String.empty;
          vm.reCaptchaResponse = String.empty;

          if (angular.isFunction(vm.onSave)) {
            vm.onSave();
          }
        })
        .catch(() => {
          log.setStack(boiler.enums.codeBlocks.controller, ['createUserController', 'api.createUser(' + vm.form.username + ', ' + vm.form.password + ', ' + vm.form.passwordHint + ', ' + vm.reCaptchaResponse + ').catch()']);
          log.error(boiler.config.verbiage.defaultCatchMessage);
        });
    };
  }]);