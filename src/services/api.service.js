'use strict';

var api = function($http, $rootScope, $timeout, log, spinner) {
  let spinnerDelay;

  const applyNextCycle = () => {
    $timeout(() => {
      $rootScope.$apply();
    }, Number.zero);
  };

  const startSpinner = () => {
    spinner.active = true;
    spinnerDelay = $timeout(() => {
      spinner.visible = true;
    }, boiler.config.spinnerDelay);
  };

  const stopSpinner = () => {
    $timeout.cancel(spinnerDelay);
    spinner.active = false;
    spinner.visible = false;
  };

  const httpGet = (url) => {
    return new Promise((resolve, reject) => {
      startSpinner();
      $http.get(url)
        .then((response) => {
          log.setStack(boiler.enums.codeBlocks.controller, ['api', 'httpGet(' + url + ').then()']);
          log.debug('response', response);
          stopSpinner();
          resolve(response);
          applyNextCycle();
        })
        .catch((e) => {
          reject(e);
          log.setStack(boiler.enums.codeBlocks.controller, ['api', 'httpGet(' + url + ').catch()']);
          log.error(boiler.config.verbiage.defaultCatchMessage);
          log.debug('e', e);
        });
    });
  };

  const httpPost = (url, payload) => {
    return new Promise((resolve, reject) => {
      startSpinner();
      $http.post(url, payload, boiler.config.defaultHeader)
        .then((response) => {
          log.setStack(boiler.enums.codeBlocks.controller, ['api', 'httpPost(' + url + ').then()']);
          log.debug('response', response);
          stopSpinner();
          resolve(response);
          applyNextCycle();
        })
        .catch((e) => {
          reject(e);
          log.setStack(boiler.enums.codeBlocks.controller, ['api', 'httpGet(' + url + ').catch()']);
          log.error(boiler.config.verbiage.defaultCatchMessage);
          log.debug('e', e);
        });
    });
  };

  const getPage = (params) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'getPage(' + params + ')']);

    const url = boiler.config.apiUrl + params;
    log.debug('url', url);

    return httpGet(url);
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

    return httpPost(url, payload);
  };

  const isUsernameAvailable = (username) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'isUsernameAvailable(' + username + ')']);

    const url = boiler.config.apiUrl + boiler.config.user.checkNameUrl + username;
    log.debug('url', url);

    return httpGet(url);
  };

  const isDeckNameAvailable = (username, deckName) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'isDeckNameAvailable(' + username, + ', ' + deckName + ')']);

    const payload = new FormData();
    payload.append('username', username);
    payload.append('name', deckName);

    const url = boiler.config.apiUrl + boiler.config.deck.checkNameUrl;
    log.debug('url', url);

    return httpPost(url, payload);
  };

  const authenticateUser = (username, password) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'authenticateUser(' + username + ', ' + password + ')']);

    const payload = new FormData();
    payload.append('username', username);
    payload.append('password', password);

    const url = boiler.config.apiUrl + boiler.config.user.authenticateUrl;
    log.debug('url', url);

    return httpPost(url, payload);
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

    return httpPost(url, payload);
  };

  const getCardsByDeck = (username, deckName) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'getCardsByDeck(' + username + ', ' + deckName + ')']);

    const url = boiler.config.apiUrl + boiler.config.cards.apiUrl + username + '/' + deckName + '/' + boiler.config.pager.getAll;
    log.debug('url', url);

    return httpGet(url);
  };

  const setSessionValue = (key, value) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'setSessionValue(' + key + ', ' + value + ')']);

    const payload = new FormData();
    payload.append('key', key);
    payload.append('value', value);

    const url = boiler.config.sessionUrl + boiler.config.session.setApi;
    log.debug('url', url);

    return httpPost(url, payload);
  };

  const getSessionValue = (key) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'getSessionValue(' + key + ')']);

    const url = boiler.config.sessionUrl + boiler.config.session.getApi + key;
    log.debug('url', url);

    return httpGet(url);
  };

  const resetPassword = (username) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'resetPassword(' + username + ')']);

    const payload = new FormData();
    payload.append('username', username);

    const url = boiler.config.apiUrl + boiler.config.user.resetPasswordUrl;
    log.debug('url', url);

    return httpPost(url, payload);
  };

  const updatePassword = (username, code, password) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'updatePassword(' + username + ', ' + code + ', ' + password + ')']);

    const payload = new FormData();
    payload.append('username', username);
    payload.append('code', code);
    payload.append('password', password);

    const url = boiler.config.apiUrl + boiler.config.user.updatePasswordUrl;
    log.debug('url', url);

    return httpPost(url, payload);
  };

  const delay = (time) => {
    log.setStack(boiler.enums.codeBlocks.service, ['api', 'delay(' + time + ')']);

    const url = boiler.config.apiUrl + boiler.config.delayUrl + time;
    log.debug('url', url);

    return httpGet(url);
  };

  return {
    delay,
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
};

api.$inject = ['$http', '$rootScope', '$timeout', 'log', 'spinner'];
angular.module('boiler').factory('api', api);