'use strict';

angular.module('boiler')
  .directive('boilerCreateUser', ['log', (log) => {
    return {
      restrict: 'E',
      scope: {
        createUserId: '@',
        onSave: '&'
      },
      bindToController: true,
      link: ($scope) => {
        log.setStack(boiler.enums.codeBlocks.directive, ['boilerCreateUser', 'link']);
        $scope.$parent.vm['child_' + $scope.vm.createUserId] = $scope.vm;
      },
      controller: 'createUserController',
      controllerAs: 'vm',
      templateUrl: './src/components/users/create-user/create-user.template.html'
    };
  }]);