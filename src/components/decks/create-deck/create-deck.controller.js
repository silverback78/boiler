'use strict';

angular.module('boiler')

  .controller('createDeckController', ['api', 'createDeck', 'log', 'stash', 'user', function(api, createDeck, log, stash, user) {
    log.setStack(boiler.enums.codeBlocks.controller, 'createDeckController');

    const vm = this;

    vm.deck;
    vm.currentUser = user;
    vm.parseText = String.empty;
    vm.decks = [];
    vm.duplicateNames = [];
    vm.options = boiler.config.parseDeck;
    vm.debounce = boiler.config.input.debounce;
    vm.checkingPassword = String.empty;
    vm.authenticated = String.empty;
    vm.errors = [];
    vm.processingDeck = false;

    vm.showCreateDeck = () => {
      vm.child_createDeck.showSequencer();
    };

    vm.save = () => {
      vm.errors = [];
      log.setStack(boiler.enums.codeBlocks.controller, ['createDeckController', 'vm.save()']);
      vm.processingDeck = true;
      Promise.all(
        vm.decks.map(
          deck => api.createDeck(vm.currentUser.username, vm.currentUser.password, deck.name, deck.description, deck.cards)
            .then((response) => {
              vm.processingDeck = false;
              log.debug('Clearing stash for ' + vm.currentUser.username + ' ' + deck.name);
              stash.set(vm.currentUser.username + deck.name, null);
              if (response.data.statusCode === boiler.config.errorStatus) {
                vm.errors.push({
                  deck: deck.name,
                  error: response.data.message
                });
              }
            })
        )
      )
        .then(() => {
          if (vm.errors.length > Number.zero) {
            vm.error();
          }

          vm.parseText = String.empty;
          vm.decks = [];

          if (angular.isFunction(vm.onSave)) {
            vm.onSave();
          }

        });
    };

    vm.generatePreview = () => {
      log.setStack(boiler.enums.codeBlocks.controller, ['createDeckController', 'vm.generatePreview()']);
      if (!vm.parseText.trim()) {
        return;
      }

      vm.decks = [];
      vm.decks = createDeck.parse(vm.parseText.trim());
      vm.duplicateNames = [];

      if (!vm.decks) return;
      Promise.all(
        vm.decks.map(
          item => api.isDeckNameAvailable(vm.currentUser.username, item.name)
            .then((response) => {
              if (!response.data) {
                vm.duplicateNames.push(item.name);
              }
            })
        )
      );
    };

    vm.getColSize = (definition) => {
      log.setStack(boiler.enums.codeBlocks.controller, ['createDeckController', 'vm.getColSize(' + definition + ')']);

      let scale = boiler.config.createDeck.preview.scale;
      let small = boiler.config.createDeck.preview.small;
      let medium = boiler.config.createDeck.preview.medium;
      let large = boiler.config.createDeck.preview.large;
      let colSize = boiler.config.createDeck.preview.colSize;

      if (definition.length < scale) {
        colSize = small;
      }
      else if (definition.length < scale * boiler.config.createDeck.preview.multiplier) {
        colSize = medium;
      }
      else {
        colSize = large;
      }

      return colSize;
    };

    vm.error = () => {
      log.setStack(boiler.enums.codeBlocks.controller, ['createDeckController', 'vm.error()']);
      vm.child_errorDialog.showDialog();
    };
  }]);