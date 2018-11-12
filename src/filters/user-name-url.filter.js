'use strict';

var usernameUrl = function() {
  const usernameUrlFilter = (username) => {
    if (username) return username.replaceAll(boiler.config.user.displaySpace, boiler.config.user.displayDash);
    return;
  };

  return usernameUrlFilter;
};

usernameUrl.$inject = [];
angular.module('boiler').filter('usernameUrl', usernameUrl);