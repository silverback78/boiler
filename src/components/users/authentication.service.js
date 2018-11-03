'use strict';

angular.module('boiler')

  .factory('authentication', ['api', 'log', 'user', (api, log, user) => {

    const initialize = () => {
      api.getSessionValue(boiler.config.users.sessionKey)
        .then((response) => {
          log.setStack(boiler.enums.codeBlocks.service, 'authentication');
          log.debug('Getting user from session');
          let data = response.data
            ? angular.fromJson(response.data)
            : {
              authenticated: false,
              username: '',
              password: '',
              loaded: true
            };
          user.authenticated = data.authenticated;
          user.username = data.username;
          user.password = data.password;
          user.loaded = true;

        })
        .catch(() => {
          log.setStack(boiler.enums.codeBlocks.service, 'authentication');
          log.error('Error getting user from session.');
          log.error(boiler.config.verbiage.defaultCatchMessage);
        });
    };

    const login = (username, password) => {
      if (!username || !password) return;
      log.setStack(boiler.enums.codeBlocks.service, ['authentication', 'login(' + username + ')']);

      log.setStack(boiler.enums.codeBlocks.service, ['authentication', 'login(' + username + ')', 'api.authenticateBox(' + username + ')']);
      api.authenticateUser(username, password)
        .then((response) => {
          log.setStack(boiler.enums.codeBlocks.service, ['authentication', 'login(' + username + ')', 'api.authenticateBox(' + username + ').then()']);
          log.debug('response', response);

          let authenticated = response.data;
          log.debug('authenticated', authenticated);

          if (authenticated) {
            api.setSessionValue(boiler.config.users.sessionKey, angular.toJson({
              authenticated: authenticated,
              username: username,
              password: password,
              loaded: true
            }));
            user.authenticated = true;
            user.authenticationFailed = false;
            user.username = username;
            user.password = password;
            user.loaded = true;
          }
          else {
            user.authenticated = false;
            user.authenticationFailed = true;
          }
        })
        .catch(() => {
          log.setStack(boiler.enums.codeBlocks.service, ['authentication', 'login(' + username + ')', 'api.authenticateBox(' + username + ').catch()']);
          log.error(boiler.config.verbiage.defaultCatchMessage);
        });
    };

    const logout = () => {
      api.setSessionValue(boiler.config.users.sessionKey, '');
      user.authenticated = false;
      user.username = null;
      user.password = null;
    };

    return {
      initialize,
      login,
      logout
    };
  }]);