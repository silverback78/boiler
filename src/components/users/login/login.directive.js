'use strict';

var boilerLogin = function() {
  return {
    restrict: 'E',
    scope: {
      onCreateUser: '&'
    },
    bindToController: true,
    controller: 'loginController',
    controllerAs: 'vm',
    templateUrl: './src/components/users/login/login.template.html'
  };
};

boilerLogin.$inject = [];
angular.module('boiler').directive('boilerLogin', boilerLogin);