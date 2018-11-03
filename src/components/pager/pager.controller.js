'use strict';

angular.module('boiler')
  .controller('pagerController', ['$location', 'api', 'log', function($location, api, log) {
    log.setStack(boiler.enums.codeBlocks.controller, 'pagerController');

    const vm = this;

    vm.currentIndex = Number.zero;
    vm.currentPage = Number.zero;
    vm.disabled = false;
    vm.pagerShowPages = true;
    vm.pagerPageSize = boiler.config.pager.defaultPageSize;
    vm.pagerOrderBy = boiler.config.pager.defaultOrderBy;
    vm.pagerOrder = boiler.config.pager.defaultOrder;
    vm.pagerData = {};
    vm.pagerColumns = [];
    vm.pagerColumnWidth = [];

    vm.clickItem = (item) => {
      if (angular.isFunction(vm.onClick)) {
        vm.onClick(item);
      }
    };

    vm.getPage = () => {
      if (vm.static) {
        return;
      }

      log.setStack(boiler.enums.codeBlocks.controller, ['pagerController', 'vm.getPage()']);
      log.debug('vm.apiUrl', vm.apiUrl);

      log.setStack(boiler.enums.codeBlocks.controller, ['pagerController', 'vm.getPage()', 'api.getPage(' + vm.apiUrl + ')']);
      const url = vm.apiUrl + '/' + vm.currentIndex + '/' + vm.pagerPageSize + '/' + vm.pagerOrderBy + '/' + vm.pagerOrder;
      api.getPage(url)
        .then(
          (response) => {
            log.setStack(boiler.enums.codeBlocks.controller, ['pagerController', 'vm.getPage()', 'api.getPage(' + url + ').then()']);
            log.debug('response', response);

            vm.data = response.data;
          }
        )
        .catch(() => {
          log.setStack(boiler.enums.codeBlocks.controller, ['pagerController', 'vm.getPage()', 'api.getPage(' + vm.apiUrl + ').catch()']);
          log.error(boiler.config.verbiage.defaultCatchMessage);
        });
    };

    vm.selectPage = (page) => {
      vm.currentPage = page;
      vm.currentIndex = page * vm.pagerPageSize;
      vm.getPage();
    };

    vm.clickItem = (item) => {
      if (!angular.isArray(vm.itemLink)) return;

      angular.forEach(vm.itemLink, (link, index) => {
        vm.itemLink[index] = item[link]
          ? item[link]
          : link;
      });

      $location.path(vm.itemLink.join('/'));
    };

    if (!angular.isArray(vm.itemLink)) vm.disabled = true;

  }]);