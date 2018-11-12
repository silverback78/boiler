'use strict';

var spinner = function() {
  let active;
  let visible;

  return {
    active,
    visible
  };
};

spinner.$inject = [];
angular.module('boiler').factory('spinner', spinner);