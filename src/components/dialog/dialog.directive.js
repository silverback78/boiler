'use strict';

angular.module('boiler')
  .directive('boilerDialog', ['log', (log) => {
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
          let width = boiler.config.dialog.size[$scope.vm.size] + 'px' || boiler.config.dialog.size.medium + 'px';
          $scope.vm.maxWidth = {
            width: '100%',
            'max-width': width
          };

          unwatchSize();
        });
      },
      controller: 'dialogController',
      controllerAs: 'vm',
      templateUrl: './src/components/dialog/dialog.template.html'
    };
  }]);