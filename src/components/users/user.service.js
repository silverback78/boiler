'use strict';

angular.module('boiler')

  .factory('user', ['log', (log) => {
    log.setStack(boiler.enums.codeBlocks.service, ['user']);

    let authenticated, loaded, username, password, emailOnFile, email;

    return {
      authenticated,
      loaded,
      username,
      password,
      emailOnFile,
      email
    };
  }]);