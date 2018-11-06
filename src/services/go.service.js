'use strict';

angular.module('boiler')

  .factory('go', ['$location', 'log', 'usernameUrlFilter', ($location, log, usernameUrlFilter) => {

    const home = () => {
      log.setStack(boiler.enums.codeBlocks.service, ['go', 'home()']);
      $location.path('/');
    };

    const toUser = (user) => {
      user = usernameUrlFilter(user);
      log.setStack(boiler.enums.codeBlocks.service, ['go', 'user(' + user + ')']);
      $location.path('users/' + user);

    };

    const toWidget = (user, deck, widget) => {
      log.setStack(boiler.enums.codeBlocks.service, ['go', 'user(' + user + ', ' + deck + ', ' + widget + ')']);
      $location.path('users/' + user + '/' + deck + '/' + widget);
    };

    return {
      home,
      toUser,
      toWidget
    };
  }]);