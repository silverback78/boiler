'use strict';

angular.module('boiler')

  .factory('spinner', [() => {

    let active;
    let visible;

    return {
      active,
      visible
    };
  }]);