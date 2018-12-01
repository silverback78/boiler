'use strict';

var go = function($location, log, addDashesFilter) {
  const home = () => {
    log.setStack(boiler.enums.codeBlocks.service, ['go', 'home()']);
    $location.path('/');
  };

  const toUser = (user, category) => {
    user = addDashesFilter(user);

    category = category
      ? '/' + addDashesFilter(category)
      : String.empty;

    log.setStack(boiler.enums.codeBlocks.service, ['go', 'user(' + user + ', ' + category + ')']);
    $location.path('users/' + user + category);
  };

  const toWidget = (user, deck, category, widget) => {
    category = category
      ? '/' + addDashesFilter(category)
      : String.empty;

    log.setStack(boiler.enums.codeBlocks.service, ['go', 'user(' + user + ', ' + deck + ', ' + category + ', ' + widget + ')']);
    $location.path('users/' + user + category + '/' + deck + '/' + widget);
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