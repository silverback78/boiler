// Using controller-as so this rule is being followed. $scope must be used to set angular material properties and triggering a false lint error
/* eslint angular/controller-as: 0 */

'use strict';

angular.module('boiler')
  .controller('navigationController', ['$location', '$mdSidenav', '$scope', 'authentication', 'go', 'log', 'spinner', 'user', function($location, $mdSidenav, $scope, authentication, go, log, spinner, user) {
    log.setStack(boiler.enums.codeBlocks.controller, 'navigationController');

    const vm = this;

    vm.currentUser = user;
    vm.go = go;
    vm.navItems = [];
    vm.location = $location;
    vm.spinner = spinner;

    vm.navItems.push({
      name: '/home',
      href: 'home',
      label: 'Home'
    });

    vm.navItems.push({
      name: '/how-it-works',
      href: 'how-it-works',
      label: 'How it Works'
    });

    $scope.$root.$on('$routeChangeSuccess', (e, current) => {
      log.setStack(boiler.enums.codeBlocks.controller, ['navigationController', '$scope.$root.$on($routeChangeSuccess)']);
      let startIndex = 0;
      let invalid = Number.negativeOne;
      let offset = Number.one;

      let paramIndex = current.$$route.originalPath.indexOf(':');
      let currentRoute = paramIndex === invalid
        ? current.$$route.originalPath
        : current.$$route.originalPath.substring(startIndex, paramIndex - offset);

      $scope.currentNavItem = currentRoute;
      vm.closeSidenav();
    });

    vm.loadRoute = (route) => {
      log.setStack(boiler.enums.codeBlocks.controller, ['navigationController', 'vm.loadRoute(' + route + ')']);
      $location.path(route);
    };

    vm.openSidenav = () => {
      log.setStack(boiler.enums.codeBlocks.controller, ['navigationController', 'vm.openSidenav()']);
      $mdSidenav('right').open();
    };

    vm.closeSidenav = () => {
      log.setStack(boiler.enums.codeBlocks.controller, ['navigationController', 'vm.closeSidenav()']);
      $mdSidenav('right').close();
    };

    vm.isSidenavOpen = () => {
      log.setStack(boiler.enums.codeBlocks.controller, ['navigationController', 'vm.isSidenavOpen()']);
      return $mdSidenav('right').isOpen();
    };

    vm.logout = () => {
      authentication.logout();
    };

  }]);
