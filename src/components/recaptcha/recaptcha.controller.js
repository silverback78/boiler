// recaptcha requires a callback in the global scope
/* eslint angular/window-service: 0 */
/* eslint angular/document-service: 0 */

'use strict';

angular.module('boiler')
  .controller('recaptchaController', ['$scope', '$timeout', 'log', function($scope, $timeout, log) {
    log.setStack(boiler.enums.codeBlocks.controller, 'recaptchaController');

    const vm = this;
    vm.reCaptchaResponse;

    $timeout(() => {
      log.setStack(boiler.enums.codeBlocks.controller, ['recaptchaController', '$timeout()']);
      log.setStack(boiler.enums.codeBlocks.controller, ['recaptchaController', 'grecaptcha.render(\'recaptcha\')']);
      grecaptcha.render( 'recaptcha', {
        'sitekey' : boiler.config.recaptcha.sitekey,
        'theme' : 'light',
        'callback': 'verifyRecaptcha'
      });
    });

    $scope.$on('reCaptchaResponse', (event, data) => {
      log.setStack(boiler.enums.codeBlocks.controller, ['recaptchaController', '$scope.$on(\'reCaptchaResponse\')']);
      log.debug('data', data);
      if (vm.parentVm && data) {
        vm.parentVm.reCaptchaResponse = data;
        $scope.$apply();
      }
    });
  }]);
