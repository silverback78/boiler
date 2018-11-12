'use strict';

var boilerContainer = function(log) {
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
          $scope.vm.theme = $scope.vm.theme || 'default';
          $scope.vm.containerSize = boiler.config.container[$scope.vm.size] || boiler.config.container.large;

          switch($scope.vm.theme) {
          case 'dark':
            $scope.vm.theme = 'dark';
            $scope.vm.colors = {
              backgroundColor: 'background-A400',
              color: 'background-50'
            };
            break;
          case 'accent':
            $scope.vm.theme = 'dark';
            $scope.vm.colors = {
              backgroundColor: 'primary-900',
              color: 'background-50'
            };
            break;
          default:
            $scope.vm.theme = 'default';
            $scope.vm.colors = {
              backgroundColor: 'background-50',
              color: 'background-A400'
            };
            break;
          }
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
};

boilerContainer.$inject = ['log'];
angular.module('boiler').directive('boilerContainer', boilerContainer);