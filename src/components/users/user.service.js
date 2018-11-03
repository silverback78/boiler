'use strict';

angular.module('boiler')

  .factory('user', ['log', (log) => {
    log.setStack(boiler.enums.codeBlocks.service, ['user']);

    let authenticated, authenticationFailed, loaded, username, password;

    return {
      authenticated,
      authenticationFailed,
      loaded,
      username,
      password
    };
  }]);