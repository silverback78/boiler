'use strict';

var toastController = function($mdToast, log) {
  log.setStack(boiler.enums.codeBlocks.controller, 'toastController');

  const vm = this;

  vm.showToast = () => {
    log.setStack(boiler.enums.codeBlocks.controller, ['toastController', 'vm.showToast()']);
    $mdToast.show(
      $mdToast.simple()
        .textContent(vm.content
          ? vm.content
          : vm.dynamicContent())
        .position(boiler.config.toast.position)
        .hideDelay(boiler.config.toast.hideDelay)
    );
  };
};

toastController.$inject = ['$mdToast', 'log'];
angular.module('boiler').controller('toastController', toastController);