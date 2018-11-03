'use strict';

angular.module('boiler')

  .factory('go', ['$location', 'log', ($location, log) => {

    const home = () => {
      log.setStack(boiler.enums.codeBlocks.service, ['go', 'home()']);
      $location.path('/');
    };

    const toUser = (user) => {
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