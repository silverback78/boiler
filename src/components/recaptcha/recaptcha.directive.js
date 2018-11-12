'use strict';

var boilerRecaptcha = function() {
  return {
    restrict: 'E',
    scope: {
      parentVm: '='
    },
    bindToController: true,
    controller: 'recaptchaController',
    controllerAs: 'vm',
    templateUrl: './src/components/recaptcha/recaptcha.template.html'
  };
};

boilerRecaptcha.$inject = [];
angular.module('boiler').directive('boilerRecaptcha', boilerRecaptcha);