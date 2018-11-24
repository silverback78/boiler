'use strict';

var removeDashes = function() {
  const removeDashes = (str) => {
    if (str) return str.replaceAll(boiler.config.user.displayDash, boiler.config.user.displaySpace);
    return;
  };

  return removeDashes;
};

removeDashes.$inject = [];
angular.module('boiler').filter('removeDashes', removeDashes);