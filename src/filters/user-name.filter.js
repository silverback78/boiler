'use strict';

var usernameFilter = function() {
  const usernameFilter = (username) => {
    if (username) return username.replaceAll(boiler.config.user.displayDash, boiler.config.user.displaySpace);
    return;
  };

  return usernameFilter;
};

usernameFilter.$inject = [];
angular.module('boiler').filter('usernameFilter', usernameFilter);