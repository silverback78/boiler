'use strict';

var sequencerController = function(log, spinner) {
  log.setStack(boiler.enums.codeBlocks.controller, 'sequencerController');

  const vm = this;

  vm.steps = [];
  vm.lastStep = vm.steps.length;
  vm.step = 0;
  vm.firstStep = 0;
  vm.lastStep = vm.steps.length;
  vm.dialogForm = String.empty;
  vm.spinner = spinner;

  vm.showSequencer = () => {
    log.setStack(boiler.enums.codeBlocks.controller, ['sequencerController', 'vm.showSequencer()']);
    vm.child_sequencerDialog.showDialog();
  };

  vm.hideSequencer = () => {
    log.setStack(boiler.enums.codeBlocks.controller, ['sequencerController', 'vm.hideSequencer()']);
    vm.child_sequencerDialog.hideDialog();
  };

  vm.select = (step) => {
    log.setStack(boiler.enums.codeBlocks.controller, ['sequencerController', 'vm.select(' + step + ')']);
    angular.forEach(vm.steps, (step) => {
      step.selected = false;
    });
    step.selected = true;
    vm.selected = step;
    if (vm.steps.length && vm.steps[vm.step].dialogSize) {
      vm.child_sequencerDialog.setSize(vm.steps[vm.step].dialogSize);
    }
    else if (vm.dialogSize) {
      vm.child_sequencerDialog.setSize(vm.dialogSize);
    }
  };

  vm.goToStep = (step) => {
    log.setStack(boiler.enums.codeBlocks.controller, ['sequencerController', 'vm.goToStep(' + step + ')']);
    vm.step = step;
    vm.select(vm.steps[vm.step]);
  };

  vm.next = () => {
    log.setStack(boiler.enums.codeBlocks.controller, ['sequencerController', 'vm.next()']);
    if (angular.isFunction(vm.steps[vm.step].onNext)) {
      vm.steps[vm.step].onNext();
    }

    vm.goToStep(vm.step + Number.one);

    if (angular.isFunction(vm.steps[vm.step].onShow)) {
      vm.steps[vm.step].onShow();
    }
  };

  vm.function1 = () => {
    log.setStack(boiler.enums.codeBlocks.controller, ['sequencerController', 'vm.function1()']);
    if (angular.isFunction(vm.steps[vm.step].onFunction1)) {
      vm.steps[vm.step].onFunction1();
    }
  };

  vm.back = () => {
    log.setStack(boiler.enums.codeBlocks.controller, ['sequencerController', 'vm.back()']);
    if (angular.isFunction(vm.steps[vm.step].onBack)) {
      vm.steps[vm.step].onBack();
    }

    vm.goToStep(vm.step - Number.one);
  };

  vm.finish = () => {
    log.setStack(boiler.enums.codeBlocks.controller, ['sequencerController', 'vm.finish()']);
    if (angular.isFunction(vm.steps[vm.step].onNext)) {
      vm.steps[vm.step].onNext();
    }

    vm.reset();
    vm.child_sequencerDialog.hideDialog();
  };

  vm.reset = () => {
    vm.sequencerForm.$setPristine();
    vm.step = Number.zero;
    vm.select(vm.steps[vm.step]);
  };

  vm.addStep = (step) => {
    log.setStack(boiler.enums.codeBlocks.controller, ['sequencerController', 'vm.addStep(' + step + ')']);
    if (!vm.steps.length) {
      vm.select(step);
    }
    vm.steps.push(step);
  };
};

sequencerController.$inject = ['log', 'spinner'];
angular.module('boiler').controller('sequencerController', sequencerController);