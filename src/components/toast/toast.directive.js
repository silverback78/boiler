'use strict';

angular.module('boiler')
  .directive('boilerToast', ['log', (log) => {
    return {
      restrict: 'E',
      scope: {
        toastId: '@',
        content: '@',
        dynamicContent: '&'
      },
      bindToController: true,
      link: ($scope) => {
        log.setStack(boiler.enums.codeBlocks.directive, ['boilerToast', 'link']);
        $scope.$parent.vm['child_' + $scope.vm.toastId] = $scope.vm;
      },
      controller: 'toastController',
      controllerAs: 'vm'
    };
  }]);