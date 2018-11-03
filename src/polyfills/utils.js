'use strict';

String.prototype.replaceAll = function(search, replacement) {
  return this.replace(new RegExp(search, 'g'), replacement);
};

String.empty = '';

Number.zero = 0;
Number.one = 1;
Number.negativeOne = -1;
Number.percentMax = 100;

Array.prototype.chooseRandom = function() {
  let index = Math.floor(Math.random() * this.length);
  return this[index];
};

Array.prototype.shuffle = function() {
  let currentIndex = this.length, temporaryValue, randomIndex;

  while (Number.zero !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= Number.one;

    temporaryValue = this[currentIndex];
    this[currentIndex] = this[randomIndex];
    this[randomIndex] = temporaryValue;
  }

  return this;
};