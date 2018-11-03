'use strict';

angular.module('boiler')
  .directive('boilerPager', ['log', (log) => {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        pagerId: '@',
        title: '@',
        pageSize: '@',
        apiUrl: '@',
        orderBy: '@',
        order: '@',
        columns: '&',
        showPages: '=',
        itemLink: '=',
        staticData: '=',
        static: '='
      },
      bindToController: true,
      link: ($scope) => {
        log.setStack(boiler.enums.codeBlocks.directive, ['boilerPager', 'link']);

        $scope.$parent.vm['child_' + $scope.vm.pagerId] = $scope.vm;

        let requiredToInitialize = ['apiUrl', 'pageSize', 'orderBy', 'order'];

        const register = (caller) => {
          var index = requiredToInitialize.indexOf(caller);
          if (index !== Number.negativeOne) requiredToInitialize.splice(index, Number.one);
        };

        const ready = () => {
          return requiredToInitialize.length === Number.zero;
        };

        const initialize = (caller) => {
          register(caller);
          if (!ready()) return;

          log.setStack(boiler.enums.codeBlocks.directive, ['boilerPager', 'initialize()']);

          unwatchApiUrl();
          unwatchPageSize();
          unwatchOrderBy();
          unwatchOrder();

          $scope.vm.getPage();
        };

        const unwatchApiUrl = $scope.$watch('$scope.vm.apiUrl', () => {
          log.setStack(boiler.enums.codeBlocks.directive, ['boilerPager', '$scope.$watch($scope.vm.apiUrl)']);
          initialize('apiUrl');
        });

        const unwatchPageSize = $scope.$watch('$scope.vm.pageSize', () => {
          log.setStack(boiler.enums.codeBlocks.directive, ['boilerPager', '$scope.$watch($scope.vm.pageSize)']);
          $scope.vm.pagerPageSize = $scope.vm.pageSize
            ? $scope.vm.pageSize
            : $scope.vm.pagerPageSize;

          initialize('pageSize');
        });

        const unwatchOrderBy = $scope.$watch('$scope.vm.orderBy', () => {
          log.setStack(boiler.enums.codeBlocks.directive, ['boilerPager', '$scope.$watch($scope.vm.orderBy)']);
          $scope.vm.pagerOrderBy = $scope.vm.orderBy
            ? $scope.vm.orderBy
            : $scope.vm.pagerOrderBy;

          initialize('orderBy');
        });

        const unwatchOrder = $scope.$watch('$scope.vm.order', () => {
          log.setStack(boiler.enums.codeBlocks.directive, ['boilerPager', '$scope.$watch($scope.vm.order)']);
          $scope.vm.pagerOrder = $scope.vm.order
            ? $scope.vm.order
            : $scope.vm.pagerOrder;

          initialize('order');
        });

        const unwatchShowPages = $scope.$watch('$scope.vm.showPages', () => {
          log.setStack(boiler.enums.codeBlocks.directive, ['boilerPager', '$scope.$watch($scope.vm.showPages)']);
          $scope.vm.pagerShowPages = $scope.vm.showPages === false
            ? false
            : true;
          unwatchShowPages();
        });

        const unwatchColumns = $scope.$watch('$scope.vm.columns', () => {
          log.setStack(boiler.enums.codeBlocks.directive, ['boilerPager', '$scope.$watch($scope.vm.columns)']);
          const columns = $scope.vm.columns();
          if (angular.isArray(columns)) {
            $scope.vm.pagerColumns = columns;
            $scope.vm.pagerColumnWidth = {
              width: Math.floor(boiler.config.pager.fullWidth / $scope.vm.pagerColumns.length) + '%'
            };
          }
          unwatchColumns();
        });
      },
      controller: 'pagerController',
      controllerAs: 'vm',
      templateUrl: './src/components/pager/pager.template.html'
    };
  }]);