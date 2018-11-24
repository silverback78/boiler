'use strict';

var addDashes = function() {
  const addDashes = (str) => {
    if (str) return str.replaceAll(boiler.config.user.displaySpace, boiler.config.user.displayDash);
    return;
  };

  return addDashes;
};

addDashes.$inject = [];
angular.module('boiler').filter('addDashes', addDashes);