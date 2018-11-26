'use strict';

var dialogController = function($document, $mdDialog, log) {
  log.setStack(boiler.enums.codeBlocks.controller, 'dialogController');

  const vm = this;

  vm.setSize = (size) => {
    log.setStack(boiler.enums.codeBlocks.controller, ['dialogController', 'vm.setSize(' + size + ')']);
    let width = boiler.config.dialog.size[size] + 'px' || boiler.config.dialog.size.medium + 'px';
    vm.maxWidth = {
      width: '100%',
      'max-width': width
    };
  };

  vm.showDialog = () => {
    log.setStack(boiler.enums.codeBlocks.controller, ['dialogController', 'vm.showDialog()']);
    $mdDialog.show({
      contentElement: '#' + vm.dialogId,
      parent: angular.element($document.body),
      clickOutsideToClose: true
    });
  };

  vm.hideDialog = () => {
    log.setStack(boiler.enums.codeBlocks.controller, ['dialogController', 'vm.hideDialog()']);
    if (angular.isFunction(vm.onHide)) {
      vm.onHide();
    }
    $mdDialog.hide();
  };

  vm.action = (action, close) => {
    log.setStack(boiler.enums.codeBlocks.controller, ['dialogController', 'vm.action(' + action + ', ' + close + ')']);
    if (angular.isFunction(action)) {
      action();
    }

    if (close) {
      vm.hideDialog();
    }
  };
};

dialogController.$inject = ['$document', '$mdDialog', 'log'];
angular.module('boiler').controller('dialogController', dialogController);