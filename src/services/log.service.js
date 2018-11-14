// Not using console, simply checking to see if it supports colors. Using $log service to actually log.
/* eslint no-console: 0 */

'use strict';

/**
 * Summary.     Factory for logging information.
 *
 * Description. The log factory should utilize colors when available and coherently display the
 *              current stack, comment, and any objects associated with the log.
 *
 *              Because logging is frequently run, in many areas code readability was sacrificed for speed.
 *
 *              Examples:
 *
 *              // With a single level stack as a string
 *              log.setStack('controller', 'ViewController');
 *              output: controller: ViewController -> called
 *
 *              // With an array as the stack
 *              log.setStack('controller', ['ViewController', 'getData()', 'api.getData().then()'])
 *              output: controller: ViewController -> getData() -> api.getData().then() -> called
 *
 *              // With the stack set, you can log a comment. You can use debug, warn, or error.
 *              log.debug('Checking to see if data exists');
 *              output:  controller: ViewController -> getData() -> api.getData().then() // Checking to see if data exists
 *
 *              // You can pass an object as a second parameter to log data
 *              log.debug('data', data);
 *              output:  controller: ViewController -> getData() -> api.getData().then() -> data = { value1: 'One', value2: 'Two' }
 *
 * setStack(string, string|array)
 *              sets the current code block and stack for this log. Code block and stack will persist until it is changed.
 *              A code block is the type of code block currently running. It can be an angular block such as
 *              controller or factory, or a plain javascript code block. It will log an error if you attempt to
 *              set a code block not listed in codeBlocks config enumeration.
 *
 *              @param {string} codeBlock          One of the code blocks from codeBlocks config enumeration.
 *              @param {string|array} stack        A string or an array that makes up the current stack.
 *              @return {void}
 *
 * debug(string, object)
 *              will log a debug message, including the current code block and stack. It will also
 *              log the contents of an object if passed.
 *
 *              @param {string} comment|name       A string that acts as the comment, or the name of an object if an object is passed.
 *              @param {object} object             An object to be stringified and logged.
 *              @return {void}
 *
 * warn(string, object)
 *              will log a warn message, including the current code block and stack. It will also
 *              log the contents of an object if passed.
 *
 *              @param {string} comment|name       A string that acts as the comment, or the name of an object if an object is passed.
 *              @param {object} object             An object to be stringified and logged.
 *              @return {void}
 *
 * error(string, object)
 *              will log an error message, including the current code block and stack. It will also
 *              log the contents of an object if passed.
 *
 *              @param {string} comment|name       A string that acts as the comment, or the name of an object if an object is passed.
 *              @param {object} object             An object to be stringified and logged.
 *              @return {void}
 *
 * reset()
 *              Resets the code block and stack.
 *
 *              @return {void}
 */
var log = function($log) {
  let codeBlock = String.empty;
  let stack = String.empty;

  let setStack = (codeBlockParam, stackParam) => {
    let logsDisabled = !boiler.config.features.log.enabled;
    let validCodeBlock = boiler.config.features.log.styles.hasOwnProperty(codeBlockParam);

    if (logsDisabled) return {};

    if (validCodeBlock) {
      codeBlock = codeBlockParam;
    }
    else {
      $log.error(boiler.config.features.log.errors.codeBlockError.replace('{codeBlock}', codeBlockParam));
    }

    stack = angular.isArray(stackParam)
      ? stackParam
      : [stackParam];

    writeLog(boiler.config.features.log.severities.debug, boiler.config.features.log.setStackCalled);
  };

  let writeLog = (logSeverity, info, obj) => {
    let logsDisabled = boiler.env !== boiler.enums.env.dev || !boiler.config.features.log.enabled;
    if (logsDisabled) return {};

    let logMessage = [];
    logMessage.push(+ new Date());
    logMessage.push(boiler.config.features.log.separators.log);

    if (!codeBlock) {
      logMessage.push(boiler.config.features.log.errors.noCodeBlock);
      logMessage.push(boiler.config.features.log.separators.log);
      logMessage.push(angular.isArray(stack)
        ? stack.join(boiler.config.features.log.separators.data)
        : String.empty);
      logMessage.push(boiler.config.features.log.separators.comment, info);
      if (obj === false) {
        logMessage.push(boiler.config.features.log.separators.log, 'false');
      }
      else if (obj === null) {
        logMessage.push(boiler.config.features.log.separators.log, 'null');
      }
      else {
        logMessage.push(boiler.config.features.log.separators.log, angular.toJson(obj));
      }
      $log.warn(logMessage.join(String.empty));
      return;
    }

    let styleParamPosition = Number.one;
    let stylesEnabled = console.debug.length === styleParamPosition && boiler.config.features.log.stylesEnabled;
    let infoStyle;

    let stackStyle = logSeverity === boiler.config.features.log.severities.warn
      ? boiler.config.features.log.styles.warn
      : logSeverity === boiler.config.features.log.severities.error
        ? boiler.config.features.log.styles.error
        : boiler.config.features.log.styles[codeBlock];

    stack = stack || [];

    logMessage.push(stylesEnabled
      ? boiler.config.features.log.separators.style
      : String.empty);

    logMessage.push(logSeverity === boiler.config.features.log.severities.warn || logSeverity === boiler.config.features.log.severities.error
      ? boiler.config.features.log.errors[logSeverity]
      : String.empty);

    logMessage.push(codeBlock, boiler.config.features.log.separators.log, stack.join(boiler.config.features.log.separators.data));

    if (obj || obj === false || obj === null) {
      logMessage.push(boiler.config.features.log.separators.data, info, boiler.config.features.log.separators.equals);

      logMessage.push(stylesEnabled
        ? boiler.config.features.log.separators.style
        : String.empty);

      if (obj === false) {
        logMessage.push(angular.toJson('false'));
      }
      else if (obj === null) {
        logMessage.push(angular.toJson('null'));
      }
      else {
        logMessage.push(angular.toJson(obj));
      }

      infoStyle = logSeverity === boiler.config.features.log.severities.warn
        ? boiler.config.features.log.styles.warn
        : logSeverity === boiler.config.features.log.severities.error
          ? boiler.config.features.log.styles.error
          : boiler.config.features.log.styles.data;
    }
    else {
      logMessage.push(stylesEnabled
        ? boiler.config.features.log.separators.style
        : String.empty);

      logMessage.push(info === boiler.config.features.log.setStackCalled
        ? boiler.config.features.log.separators.data
        : boiler.config.features.log.separators.comment
      );

      logMessage.push(info);
      infoStyle = logSeverity === boiler.config.features.log.severities.warn
        ? boiler.config.features.log.styles.warn
        : logSeverity === boiler.config.features.log.severities.error
          ? boiler.config.features.log.styles.error
          : info === boiler.config.features.log.setStackCalled
            ? boiler.config.features.log.styles.data
            : boiler.config.features.log.styles.comment;
    }

    if (stylesEnabled) {
      $log[logSeverity](logMessage.join(String.empty), stackStyle, infoStyle);
    }
    else {
      $log[logSeverity](logMessage.join(String.empty));
    }
  };

  let reset = () => {
    codeBlock = String.empty;
    stack = String.empty;
  };

  return {
    setStack,
    debug: (info, obj) => {
      writeLog(boiler.config.features.log.severities.debug, info, obj);
    },
    warn: (info, obj) => {
      writeLog(boiler.config.features.log.severities.warn, info, obj);
    },
    error: (info, obj) => {
      writeLog(boiler.config.features.log.severities.error, info, obj);
    },
    reset: () => {
      reset();
    }
  };
};

log.$inject = ['$log'];
angular.module('boiler').factory('log', log);
