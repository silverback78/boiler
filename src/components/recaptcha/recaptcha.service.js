// reCaptcha requires a callback in the global scope
/* eslint angular/window-service: 0 */
/* eslint angular/document-service: 0 */

'use strict';

window.verifyRecaptcha = (response) => {
  const elem = angular.element(document.querySelector('[ng-app]'));
  const injector = elem.injector();
  const reCaptcha = injector.get('reCaptcha');
  reCaptcha.setReCaptchaResponse(response);
};

var reCaptcha = function($rootScope, log) {
  log.setStack(boiler.enums.codeBlocks.service, 'reCaptcha');

  const setReCaptchaResponse = (response) => {
    log.setStack(boiler.enums.codeBlocks.service, ['reCaptcha', 'setReCaptchaResponse(' + response + ')']);
    $rootScope.$broadcast('reCaptchaResponse', response);
  };

  return {
    setReCaptchaResponse
  };
};

reCaptcha.$inject = ['$rootScope', 'log'];
angular.module('boiler').factory('reCaptcha', reCaptcha);
