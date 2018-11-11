'use strict';

angular.module('boiler')
  .directive('boilerTab', () => {
    return function ($scope, element, attrs) {
      element.bind('keydown keypress', (event) => {
        if (event.which === boiler.config.input.tabKey) {
          let curVal = attrs.$$element.val();
          curVal += '\t';
          attrs.$$element.val(curVal);
          event.preventDefault();
        }
      });
    };
  });