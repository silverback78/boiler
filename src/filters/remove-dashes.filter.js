'use strict';

var removeDashes = function() {
  const removeDashes = (str) => {
    if (str) {
      str = str.replaceAll(boiler.config.user.displayTrippleDash, boiler.config.user.displayLongDash);
      str = str.replaceAll(boiler.config.user.displayDash, boiler.config.user.displaySpace);
      return str;
    }
    return;
  };

  return removeDashes;
};

removeDashes.$inject = [];
angular.module('boiler').filter('removeDashes', removeDashes);