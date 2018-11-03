'use strict';

angular.module('boiler')
  .directive('boilerSequencer', ['log', (log) => {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        sequencerId: '@',
        title: '@',
        dialog: '=',
        dialogSize: '@',
        dialogClass: '@',
        show: '='
      },
      bindToController: true,
      link: ($scope) => {
        log.setStack(boiler.enums.codeBlocks.directive, ['boilerSequencer', 'link']);

        $scope.$parent.vm['child_' + $scope.vm.sequencerId] = $scope.vm;
        const unwatchDialogSize = $scope.$watch('$scope.vm.dialogSize', () => {
          log.setStack(boiler.enums.codeBlocks.directive, ['boilerSequencer', '$scope.$watch($scope.vm.dialogSize)']);
          log.debug('$scope.vm.dialogSize', $scope.vm.dialogSize);
          $scope.vm.dialogSize = $scope.vm.dialogSize || boiler.config.dialog.sizeOptions.medium;
          unwatchDialogSize();
        });
      },
      controller: 'sequencerController',
      controllerAs: 'vm',
      templateUrl: './src/components/sequencer/sequencer.template.html'
    };
  }]);