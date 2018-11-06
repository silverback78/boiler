'use strict';

angular.module('boiler')

  .filter('usernameUrl', [() => {

    const usernameUrlFilter = (username) => {
      if (username) return username.replaceAll(boiler.config.user.displaySpace, boiler.config.user.displayDash);
      return;
    };

    return usernameUrlFilter;
  }]);