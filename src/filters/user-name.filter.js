'use strict';

angular.module('boiler')

  .filter('usernameFilter', [() => {

    const usernameFilter = (username) => {
      if (username) return username.replaceAll(boiler.config.user.displayFind, boiler.config.user.displayReplace);
      return;
    };

    return usernameFilter;
  }]);