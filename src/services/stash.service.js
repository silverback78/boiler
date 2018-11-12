'use strict';

var stash = function(log) {
  const storageSupported = () => {
    return typeof(Storage) !== 'undefined';
  };

  const get = (key) => {
    if (!storageSupported()) return null;

    log.setStack(boiler.enums.codeBlocks.service, ['stash', 'get(' + key + ')']);
    let value = localStorage.getItem(key);
    value = angular.fromJson(value);

    return value;
  };

  const set = (key, value) => {
    if (!storageSupported()) return;

    value = angular.toJson(value);
    log.setStack(boiler.enums.codeBlocks.service, ['stash', 'set(' + key + ', ' + value + ')']);
    localStorage.setItem(key, value);
  };

  return {
    get,
    set
  };
};

stash.$inject = ['log'];
angular.module('boiler').factory('stash', stash);