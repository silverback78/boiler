'use strict';

var user = function(log) {
  log.setStack(boiler.enums.codeBlocks.service, ['user']);

  let authenticated, loaded, username, password, decks, emailOnFile, email;

  return {
    authenticated,
    loaded,
    username,
    password,
    decks,
    emailOnFile,
    email
  };
};

user.$inject = ['log'];
angular.module('boiler').factory('user', user);