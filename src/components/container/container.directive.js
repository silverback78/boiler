'use strict';

angular.module('boiler')
  .directive('boilerContainer', ['log', (log) => {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        theme: '@',
        size: '@',
        padding: '=',
        nav: '='
      },
      bindToController: true,
      compile: () => {
        return {
          pre: ($scope) => {
            $scope.vm.theme = 'default';
            $scope.vm.containerSize = boiler.config.container[$scope.vm.size] || boiler.config.container.large;
          }
        };
      },
      link: ($scope) => {
        log.setStack(boiler.enums.codeBlocks.directive, ['boilerContainer', 'link']);
        $scope.$parent.vm['child_' + $scope.vm.createUserId] = $scope.vm;
      },
      controller: 'containerController',
      controllerAs: 'vm',
      templateUrl: './src/components/container/container.template.html'
    };
  }]);