'use strict';

angular.module('boiler')
  .directive('boilerTab', () => {
    return function ($scope, element, attrs) {
      element.bind('keydown keypress', (event) => {
        if (event.which === boiler.config.input.tabKey) {
          const cursorPosition = attrs.$$element[Number.zero].selectionStart;
          const curVal = attrs.$$element.val();
          const result = [curVal.slice(Number.zero, cursorPosition), '\t', curVal.slice(cursorPosition)].join('');
          attrs.$$element.val(result);
          attrs.$$element[Number.zero].focus();
          attrs.$$element[Number.zero].setSelectionRange(cursorPosition + Number.one, cursorPosition + Number.one);
          event.preventDefault();
        }
      });
    };
  });