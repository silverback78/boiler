'use strict';

var authentication = function(api, log, user, addDashesFilter) {
  const initialize = () => {
    log.setStack(boiler.enums.codeBlocks.service, ['authentication', 'initialize()']);
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
        user.username = addDashesFilter(data.username);
        user.password = data.password;
        user.email = data.email;
        user.loaded = true;
        log.debug('user', user);
      });
  };

  const login = (username, password) => {
    if (!username || !password) return;
    log.setStack(boiler.enums.codeBlocks.service, ['authentication', 'login(' + username + ')']);

    return new Promise((resolve) => {
      api.authenticateUser(username, password)
        .then((response) => {
          const data = response.data;
          log.debug('user', data);

          user.username = addDashesFilter(data.username);
          user.password = password;
          user.loaded = true;

          if (data.authenticated === true) {
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
            if (data.referenceCode === boiler.config.user.emailOnFileErrorCode ||
                data.referenceCode === boiler.config.user.expiredRecoveryCode ||
                data.referenceCode === boiler.config.user.invalidRecoveryCode) {
              user.emailOnFile = true;
            }
            else {
              user.emailOnFile = false;
            }
          }

          resolve(user);
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
};

authentication.$inject = ['api', 'log', 'user', 'addDashesFilter'];
angular.module('boiler').factory('authentication', authentication);