'use strict';

var usersViewController = function($routeParams, api, log, go, user) {
  log.setStack(boiler.enums.codeBlocks.controller, 'usersViewController');

  const vm = this;

  vm.decks = [];
  vm.categories = [];
  vm.currentUser = user;
  vm.username = $routeParams.username;
  vm.containerSize = boiler.config.container.large;
  vm.go = go;
  vm.thisUser;
  vm.category = String.empty;
  vm.deleteDeck;
  vm.editDeck;
  vm.loaded = false;

  vm.refreshDecks = () => {
    api.getDecks(vm.username)
      .then((response) => {
        if (response.data.decks)
          vm.decks = response.data.decks;

        if (response.data.deckCategories)
          vm.categories = response.data.deckCategories;

        vm.loaded = true;
      });
  };

  vm.edit = (deck) => {
    vm.editDeck = deck;
    vm.child_editDialog.showDialog();
  };

  vm.save = () => {
    api.updateDeck(vm.username, vm.currentUser.password, vm.editDeck.name, vm.editDeck.description, vm.editDeck.category)
      .then(() => {
        vm.refreshDecks();
      });
  };

  vm.confirmDelete = (deck) => {
    vm.child_deleteDialog.showDialog();
    vm.deleteDeck = deck;
  };

  vm.delete = () => {
    api.deleteDeck(vm.username, vm.deleteDeck.name, vm.currentUser.password)
      .then(() => {
        vm.refreshDecks();
      });
  };

  vm.refreshDecks();
};

usersViewController.$inject = ['$routeParams', 'api', 'log', 'go', 'user'];
angular.module('boiler').controller('usersViewController', usersViewController);