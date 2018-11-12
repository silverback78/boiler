'use strict';

var boilerToast = function(log) {
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
};

boilerToast.$inject = ['log'];
angular.module('boiler').directive('boilerToast', boilerToast);