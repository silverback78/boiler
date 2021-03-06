'use strict';

var boilerDialog = function(log) {
  return {
    restrict: 'E',
    transclude: {
      'content': 'paneContent',
      'buttons': '?paneButtons'
    },
    scope: {
      dialogId: '@',
      title: '@',
      size: '@',
      dialogClass: '@',
      buttons: '=',
      dialogForm: '=?'
    },
    bindToController: true,
    link: ($scope) => {
      log.setStack(boiler.enums.codeBlocks.directive, ['boilerDialog', 'link']);

      $scope.$parent.vm['child_' + $scope.vm.dialogId] = $scope.vm;

      const unwatchSize = $scope.$watch('$scope.vm.size', () => {
        log.setStack(boiler.enums.codeBlocks.directive, ['boilerDialog', '$scope.$watch($scope.vm.size)']);
        log.debug('$scope.vm.size', $scope.vm.size);
        $scope.vm.setSize($scope.vm.size);
        unwatchSize();
      });
    },
    controller: 'dialogController',
    controllerAs: 'vm',
    templateUrl: './src/components/dialog/dialog.template.html'
  };
};

boilerDialog.$inject = ['log'];
angular.module('boiler').directive('boilerDialog', boilerDialog);