'use strict';

angular.module('boiler')

  .factory('authentication', ['api', 'log', 'user', 'usernameUrlFilter', (api, log, user, usernameUrlFilter) => {

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
              email: '',
              loaded: true
            };
          user.authenticated = data.authenticated;
          user.username = usernameUrlFilter(data.username);
          user.password = data.password;
          user.email = data.email;
          user.loaded = true;
          log.debug('user', user);
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

      return new Promise((resolve, reject) => {
        log.setStack(boiler.enums.codeBlocks.service, ['authentication', 'login(' + username + ')', 'api.authenticateBox(' + username + ')']);
        api.authenticateUser(username, password)
          .then((response) => {
            log.setStack(boiler.enums.codeBlocks.service, ['authentication', 'login(' + username + ')', 'api.authenticateBox(' + username + ').then()']);
            log.debug('response', response);

            const data = response.data;
            log.debug('user', data);

            user.username = usernameUrlFilter(data.username);
            user.password = password;
            user.loaded = true;

            if (data.statusCode === boiler.config.apiSuccessCode) {
              api.setSessionValue(boiler.config.users.sessionKey, angular.toJson({
                authenticated: true,
                username: data.username,
                password: password,
                email: data.email,
                loaded: true
              }));
              user.authenticated = true;
            }
            else {
              user.authenticated = false;
              if (data.referenceCode === boiler.config.user.emailOnFileErrorCode) {
                user.emailOnFile = true;
              }
              else {
                user.emailOnFile = false;
              }
            }

            resolve(user);
          })
          .catch(() => {
            reject();
            log.setStack(boiler.enums.codeBlocks.service, ['authentication', 'login(' + username + ')', 'api.authenticateBox(' + username + ').catch()']);
            log.error(boiler.config.verbiage.defaultCatchMessage);
          });
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