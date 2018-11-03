'use strict';

angular.module('boiler')
  .directive('boilerContainer', ['log',  (log) => {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        theme: '@',
        size: '@',
        fullWidth: '=',
        padding: '=',
        nav: '='
      },
      bindToController: true,
      link: ($scope) => {
        log.setStack(boiler.enums.codeBlocks.directive, ['boilerContainer', 'link']);

        $scope.$parent.vm['child_' + $scope.vm.createUserId] = $scope.vm;
        const unwatchSize = $scope.$watch('$scope.vm.size', () => {
          log.setStack(boiler.enums.codeBlocks.directive, ['boilerContainer', '$scope.$watch($scope.vm.size)']);
          log.debug('$scope.vm.size', $scope.vm.size);
          $scope.vm.containerSize = boiler.config.container[$scope.vm.size] || boiler.config.container.large;
          unwatchSize();
        });

        const unwatchTheme = $scope.$watch('$scope.vm.theme', () => {
          log.setStack(boiler.enums.codeBlocks.directive, ['boilerContainer', '$scope.$watch($scope.vm.theme)']);
          log.debug('$scope.vm.theme', $scope.vm.theme);
          if ($scope.vm.theme === boiler.config.container.darkTheme) {
            $scope.vm.containerTheme = boiler.config.container.darkTheme;
            $scope.vm.backgroundColor = boiler.config.container.darkBackgroundColor;
          }
          unwatchTheme();
        });
      },
      controller: 'containerController',
      controllerAs: 'vm',
      templateUrl: './src/components/container/container.template.html'
    };
  }]);