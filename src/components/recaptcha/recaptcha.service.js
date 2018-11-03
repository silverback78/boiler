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

angular.module('boiler')

  .factory('reCaptcha', ['$rootScope', 'log', ($rootScope, log) => {
    log.setStack(boiler.enums.codeBlocks.service, 'reCaptcha');

    const setReCaptchaResponse = (response) => {
      log.setStack(boiler.enums.codeBlocks.service, ['reCaptcha', 'setReCaptchaResponse(' + response + ')']);
      $rootScope.$broadcast('reCaptchaResponse', response);
    };

    return {
      setReCaptchaResponse
    };
  }]);
