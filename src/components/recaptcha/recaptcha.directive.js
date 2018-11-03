'use strict';

angular.module('boiler')
  .directive('boilerRecaptcha', [() => {
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
  }]);