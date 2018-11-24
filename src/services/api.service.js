'use strict';

var api = function($http, $rootScope, $timeout, log, spinner) {
  const applyNextCycle = () => {
    $timeout(() => {
      $rootScope.$apply();
    }, Number.zero);
  };

  const startSpinner = () => {
    if (spinner.active) return;
    spinner.active = true;
    boiler.globals.spinnerDelay = $timeout(() => {
      spinner.visible = true;
    }, boiler.config.spinnerDelay);
  };

  const stopSpinner = () => {
    $timeout.cancel(boiler.globals.spinnerDelay);
    spinner.active = false;
    spinner.visible = false;
  };

  const sendRequest = (verb, url, data) => {
    return new Promise((resolve, reject) => {
      startSpinner();
      $http({
        method: verb,
        url: url,
        data: data,
        headers: {'Content-Type': 'application/json'}
      })
        .then((response) => {
          log.setStack(boiler.enums.codeBlocks.service, ['api', 'httpGet(' + url + ').then()']);
          log.debug('response', response);
          stopSpinner();
          resolve(response);
          applyNextCycle();
        })
        .catch((e) => {
          reject(e);
          log.setStack(boiler.enums.codeBlocks.service, ['api', 'httpGet(' + url + ').catch()']);
          log.error(boiler.config.verbiage.defaultCatchMessage);
          log.debug('e', e);
        });
    });
  };

  const getSessionValue = (key) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'getSessionValue(' + key + ')']);

    const url = boiler.config.sessionUrl + boiler.config.session.getApi + key;
    log.debug('url', url);

    return sendRequest('GET', url);
  };

  const setSessionValue = (key, value) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'setSessionValue(' + key + ', ' + value + ')']);

    const data = {
      key: key,
      value: value
    };

    const url = boiler.config.sessionUrl + boiler.config.session.setApi;
    log.debug('url', url);

    return sendRequest('PUT', url, data);
  };

  const isUsernameAvailable = (username) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'isUsernameAvailable(' + username + ')']);

    const url = boiler.config.apiUrl + boiler.config.user.checkNameUrl + username;
    log.debug('url', url);

    return sendRequest('GET', url);
  };

  const createUser = (username, password, email, reCaptchaResponse) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'createUser(' + username + ', ' + password + ', ' + email + ', ' + reCaptchaResponse + ')']);

    const data = {
      data: {
        username: username,
        password: password,
        email: email,
        reCaptchaResponse: reCaptchaResponse
      }
    };

    const url = boiler.config.apiUrl + boiler.config.user.apiUrl;
    log.debug('url', url);

    return sendRequest('POST', url, data);
  };

  const updateUser = (username, password, newPassword, email) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'createUser(' + username + ', ' + password + ', ' + email + ')']);

    const data = {
      username: username,
      password: password,
      data: {
        password: newPassword,
        email: email
      }
    };

    const url = boiler.config.apiUrl + boiler.config.user.apiUrl;
    log.debug('url', url);

    return sendRequest('PUT', url, data);
  };

  const updateDeck = (username, password, deckName, description, category) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'updateDeck(' + username + ', ' + password + ', ' + deckName + ', ' + description + ')']);

    const data = {
      username: username,
      password: password,
      deckName: deckName,
      data: {
        description: description,
        category: category
      }
    };

    const url = boiler.config.apiUrl + boiler.config.deck.apiUrl;
    log.debug('url', url);

    return sendRequest('PUT', url, data);
  };

  const createDeck = (username, password, deckName, description, category, cards) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'createDeck(' + username + ', ' + password + ', ' + deckName + ', ' + description + ', ' + cards + ')']);

    const data = {
      username: username,
      password: password,
      deckName: deckName,
      data: {
        description: description,
        category: category,
        cards: cards
      }
    };

    const url = boiler.config.apiUrl + boiler.config.deck.apiUrl;
    log.debug('url', url);

    return sendRequest('PUT', url, data);
  };

  const authenticateUser = (username, password) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'authenticateUser(' + username + ', ' + password + ')']);

    const url = boiler.config.apiUrl + boiler.config.user.authenticateUrl + username + '/' + password;
    log.debug('url', url);

    return sendRequest('GET', url);
  };

  const getPage = (params) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'getPage(' + params + ')']);

    const url = boiler.config.apiUrl + params;
    log.debug('url', url);

    return sendRequest('GET', url);
  };

  const getUser = (user) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'getUser()']);

    const url = boiler.config.apiUrl + boiler.config.user.apiUrl + user;
    log.debug('url', url);

    return sendRequest('GET', url);
  };

  const getDecks = (user) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'getDecks()']);

    const url = boiler.config.apiUrl + boiler.config.decks.apiUrl + user;
    log.debug('url', url);

    return sendRequest('GET', url);
  };

  const deleteDeck = (username, deckName, password) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'deleteDeck()']);

    const url = boiler.config.apiUrl + boiler.config.deck.apiUrl + username + '/' + deckName + '/' + password;
    log.debug('url', url);

    return sendRequest('DELETE', url);
  };

  const isDeckNameAvailable = (username, deckName) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'isDeckNameAvailable(' + username, + ', ' + deckName + ')']);

    const url = boiler.config.apiUrl + boiler.config.deck.checkNameUrl + username + '/' + deckName;
    log.debug('url', url);

    return sendRequest('GET', url);
  };

  const getCards = (username, deckName) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'getCards(' + username + ', ' + deckName + ')']);

    const url = boiler.config.apiUrl + boiler.config.cards.apiUrl + username + '/' + deckName;
    log.debug('url', url);

    return sendRequest('GET', url);
  };

  const resetPassword = (username) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'resetPassword(' + username + ')']);

    const url = boiler.config.apiUrl + boiler.config.user.apiUrl + boiler.config.user.resetPasswordUrl + username;
    log.debug('url', url);

    return sendRequest('GET', url);
  };

  return {
    isUsernameAvailable,
    getSessionValue,
    setSessionValue,
    createUser,
    authenticateUser,
    getPage,
    getUser,
    getDecks,
    deleteDeck,
    isDeckNameAvailable,
    createDeck,
    getCards,
    resetPassword,
    updateUser,
    updateDeck
  };
};

api.$inject = ['$http', '$rootScope', '$timeout', 'log', 'spinner'];
angular.module('boiler').factory('api', api);