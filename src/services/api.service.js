'use strict';

angular.module('boiler')

  .factory('api', ['$http', 'log', ($http, log) => {

    const getPage = (params) => {
      log.setStack(boiler.enums.codeBlocks.service, ['api', 'getPage(' + params + ')']);

      const url = boiler.config.apiUrl + params;
      log.debug('url', url);

      return $http.get(url);
    };

    const createUser = (username, password, email, reCaptchaResponse) => {
      log.setStack(boiler.enums.codeBlocks.service, ['api', 'createUser(' + username + ', ' + password + ', ' + email + ', ' + reCaptchaResponse + ')']);

      const payload = new FormData();
      payload.append('username', username);
      payload.append('password', password);
      payload.append('email', email);
      payload.append('reCaptchaResponse', reCaptchaResponse);

      const url = boiler.config.apiUrl + boiler.config.user.apiUrl;
      log.debug('url', url);

      return $http.post(url, payload, boiler.config.defaultHeader);
    };

    const isUsernameAvailable = (username) => {
      log.setStack(boiler.enums.codeBlocks.service, ['api', 'isUsernameAvailable(' + username + ')']);

      const url = boiler.config.apiUrl + boiler.config.user.checkNameUrl + username;
      log.debug('url', url);

      return $http.get(url);
    };

    const isDeckNameAvailable = (username, deckName) => {
      log.setStack(boiler.enums.codeBlocks.service, ['api', 'isDeckNameAvailable(' + username, + ', ' + deckName + ')']);

      const payload = new FormData();
      payload.append('username', username);
      payload.append('name', deckName);

      const url = boiler.config.apiUrl + boiler.config.deck.checkNameUrl;
      log.debug('url', url);

      return $http.post(url, payload, boiler.config.defaultHeader);
    };

    const authenticateUser = (username, password) => {
      log.setStack(boiler.enums.codeBlocks.service, ['api', 'authenticateUser(' + username + ', ' + password + ')']);

      const payload = new FormData();
      payload.append('username', username);
      payload.append('password', password);

      const url = boiler.config.apiUrl + boiler.config.user.authenticateUrl;
      log.debug('url', url);

      return $http.post(url, payload, boiler.config.defaultHeader);
    };

    const createDeck = (username, password, deckName, description, cards) => {
      log.setStack(boiler.enums.codeBlocks.service, ['api', 'createDeck(' + username + ', ' + password + ', ' + deckName + ', ' + description + ', ' + cards + ')']);

      const payload = new FormData();
      payload.append('username', username);
      payload.append('password', password);
      payload.append('deckName', deckName);
      payload.append('description', description);
      payload.append('cards', angular.toJson(cards));

      const url = boiler.config.apiUrl + boiler.config.deck.apiUrl;
      log.debug('url', url);

      return $http.post(url, payload, boiler.config.defaultHeader);
    };

    const getCardsByDeck = (username, deckName) => {
      log.setStack(boiler.enums.codeBlocks.service, ['api', 'getCardsByDeck(' + username + ', ' + deckName + ')']);

      const url = boiler.config.apiUrl + boiler.config.cards.apiUrl + username + '/' + deckName + '/' + boiler.config.pager.getAll;
      log.debug('url', url);

      return $http.get(url);
    };

    const setSessionValue = (key, value) => {
      log.setStack(boiler.enums.codeBlocks.service, ['api', 'setSessionValue(' + key + ', ' + value + ')']);

      const payload = new FormData();
      payload.append('key', key);
      payload.append('value', value);

      const url = boiler.config.sessionUrl + boiler.config.session.setApi;
      log.debug('url', url);

      return $http.post(url, payload, boiler.config.defaultHeader);
    };

    const getSessionValue = (key) => {
      log.setStack(boiler.enums.codeBlocks.service, ['api', 'getSessionValue(' + key + ')']);

      const url = boiler.config.sessionUrl + boiler.config.session.getApi + key;
      log.debug('url', url);

      return $http.get(url);
    };

    const resetPassword = (username) => {
      log.setStack(boiler.enums.codeBlocks.service, ['api', 'resetPassword(' + username + ')']);

      const payload = new FormData();
      payload.append('username', username);

      const url = boiler.config.apiUrl + boiler.config.user.resetPasswordUrl;
      log.debug('url', url);

      return $http.post(url, payload, boiler.config.defaultHeader);
    };

    const updatePassword = (username, code, password) => {
      log.setStack(boiler.enums.codeBlocks.service, ['api', 'updatePassword(' + username + ', ' + code + ', ' + password + ')']);

      const payload = new FormData();
      payload.append('username', username);
      payload.append('code', code);
      payload.append('password', password);

      const url = boiler.config.apiUrl + boiler.config.user.updatePasswordUrl;
      log.debug('url', url);

      return $http.post(url, payload, boiler.config.defaultHeader);
    };

    return {
      getPage,
      createUser,
      isUsernameAvailable,
      createDeck,
      authenticateUser,
      isDeckNameAvailable,
      getCardsByDeck,
      setSessionValue,
      getSessionValue,
      resetPassword,
      updatePassword
    };
  }]);