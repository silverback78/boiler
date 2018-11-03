'use strict';

angular.module('boiler')
  .directive('boilerLogin', [() => {
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
  }]);