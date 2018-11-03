'use strict';

angular.module('boiler')

  .factory('createDeck', ['log', (log) => {

    let createViewModel = (args) => {
      log.setStack(boiler.enums.codeBlocks.service, 'createDeck.createViewModel(' + args + ')');

      let vm;

      if (args.deck) {
        args.deck = {
          name: String.empty,
          description: String.empty,
          cards: []
        };

        vm = args;
      }
      else {
        vm = {
          decks: [],
          deck: {
            name: String.empty,
            description: String.empty,
            cards: []
          },
          rows: args,
          startIndex: boiler.config.parseDeck.startIndex,
          options: boiler.config.parseDeck
        };
      }

      findNextLine(vm);

      let nameDesc = vm.rows[vm.startIndex].split(vm.options.colonDelimeter);

      vm.deck.name = nameDesc[vm.options.oneRowKVP.nameIndex]
        ? nameDesc[vm.options.oneRowKVP.nameIndex]
        : String.empty;

      vm.deck.description = nameDesc[vm.options.oneRowKVP.descIndex]
        ? nameDesc[vm.options.oneRowKVP.descIndex].trim()
        : String.empty;

      return vm;
    };

    let findNextLine = (vm) => {
      log.setStack(boiler.enums.codeBlocks.service, ['createDeck', 'findNextLine(' + vm + ')']);

      for (let i = vm.startIndex; i < vm.rows.length; i++) {
        if (vm.rows[i].trim() === String.empty) {
          vm.startIndex ++;
        }
        else {
          break;
        }
      }
    };

    // First row contains Title: Description
    // Subsequent rows contain cards in the format of term[tab]definition
    let oneRowKVP = (args) => {
      log.setStack(boiler.enums.codeBlocks.service, ['createDeck', 'oneRowKVP(' + args + ')']);

      let vm = createViewModel(args);

      for (let i = vm.startIndex + vm.options.increment; i < vm.rows.length; i++) {

        if (vm.rows[i] === String.empty) {
          vm.startIndex = i + vm.options.increment;
          break;
        }

        let termDef = vm.rows[i].split(vm.options.tabDelimeter);
        let term = termDef[vm.options.oneRowKVP.termIndex];
        let definition = termDef[vm.options.oneRowKVP.definitionIndex]
          ? termDef[vm.options.oneRowKVP.definitionIndex].replaceAll(String.fromCharCode(vm.options.newlineCharacter), vm.options.newline)
          : String.empty;

        vm.deck.cards.push({
          term: term,
          definition: definition
        });

        if (i === vm.rows.length - vm.options.increment) {
          vm.eof = true;
        }
      }

      if (vm.deck.cards.length > vm.options.startIndex) {
        vm.decks.push(vm.deck);
      }

      if (!vm.eof) {
        oneRowKVP(vm);
      }

      return vm.decks;
    };

    // First row contains Title: Description
    // Subsequent rows are in two row pairs, first for term and second for definition. Empty lines ignored.
    let twoRowsKVP = (args) => {
      log.setStack(boiler.enums.codeBlocks.service, ['createDeck', 'twoRowsKVP(' + args + ')']);

      let vm = createViewModel(args);

      let newCardCounter = vm.options.twoRowsKVP.newCardDefault;
      let term = String.empty;

      for (let i = vm.startIndex + vm.options.increment; i < vm.rows.length; i++) {

        if (vm.rows[i].trim() === String.empty) {
          newCardCounter++;

          if (newCardCounter === vm.options.twoRowsKVP.newCardBreaks) {
            vm.startIndex = i + vm.options.increment;
            break;
          }
        }
        else {
          newCardCounter = vm.options.twoRowsKVP.newCardDefault;

          if (term) {
            let definition = vm.rows[i];
            vm.deck.cards.push({
              term: term,
              definition: definition
            });

            term = String.empty;
          }
          else {
            term = vm.rows[i];
          }

          if (i === vm.rows.length - vm.options.increment) {
            vm.eof = true;
          }
        }
      }

      if (vm.deck.cards.length > vm.options.startIndex) {
        vm.decks.push(vm.deck);
      }

      if (!vm.eof) {
        twoRowsKVP(vm);
      }

      return vm.decks;
    };

    let parse = (parseText) => {
      log.setStack(boiler.enums.codeBlocks.service, ['createDeck', 'parse' + parseText]);

      let rows = parseText.trim().split(boiler.config.parseDeck.newLineDelimeter);

      if (rows[boiler.config.parseDeck.firstCardIndex].match(boiler.config.parseDeck.tabDelimeter)) {
        return oneRowKVP(rows);
      }
      else if (rows[boiler.config.parseDeck.firstCardIndex] === String.empty) {
        return twoRowsKVP(rows);
      }
      else {
        return twoRowsKVP(rows);
      }
    };

    return {
      parse
    };
  }]);