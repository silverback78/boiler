'use strict';

var go = function($location, log, addDashesFilter) {
  const home = () => {
    log.setStack(boiler.enums.codeBlocks.service, ['go', 'home()']);
    $location.path('/');
  };

  const toUser = (user) => {
    user = addDashesFilter(user);
    log.setStack(boiler.enums.codeBlocks.service, ['go', 'user(' + user + ')']);
    $location.path('users/' + user);

  };

  const toWidget = (user, deck, widget) => {
    log.setStack(boiler.enums.codeBlocks.service, ['go', 'user(' + user + ', ' + deck + ', ' + widget + ')']);
    $location.path('users/' + user + '/' + deck + '/' + widget);
  };

  const toHowItWorks = () => {
    log.setStack(boiler.enums.codeBlocks.service, ['go', 'toHowItWorks()']);
    $location.path('how-it-works');
  };

  return {
    home,
    toUser,
    toHowItWorks,
    toWidget
  };
};

go.$inject = ['$location', 'log', 'addDashesFilter'];
angular.module('boiler').factory('go', go);