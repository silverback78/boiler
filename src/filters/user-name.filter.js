'use strict';

angular.module('boiler')

  .filter('usernameFilter', [() => {

    const usernameFilter = (username) => {
      if (username) return username.replaceAll(boiler.config.user.displayDash, boiler.config.user.displaySpace);
      return;
    };

    return usernameFilter;
  }]);