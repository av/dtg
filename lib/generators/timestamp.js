'use strict';

module.exports = generateTimestamp;

/**
 * @examples
 * 
 *   Ago pattern
 *   From one to two minutes ago
 *   '1..2m ago' ~ Date.now() - (1..2 * 60 * 1000)
 *   
 *   From two to five months ago
 *   '2..5M ago' ~ Date.now() - (2..5 * 30 * 24 * 60 * 60 * 1000)
 */
function generateTimestamp(expression) {
  let start = Date.now();
  let operators = expression.split(' ');
  
  return OPERATORS[operators[1]](start, rand(operators[0]));
}

const UNITS = {
  'ms': 1,
  's': 1000,
  'm': 1000 * 60,
  'h': 1000 * 60 * 60,
  'd': 1000 * 60 * 60 * 24,
  'w': 1000 * 60 * 60 * 24 * 7,
  'M': 1000 * 60 * 60 * 24 * 30,
  'y': 1000 * 60 * 60 * 24 * 30 * 365
};

const OPERATORS = {
  ago: (start, d) => start - d,
  now: () => Date.now()
};

/**
 * Generates random timestamp in given range
 * 
 * @param {String} range Range expression
 */
function rand(range) {
  let unit = UNITS[range.substr(-1)];

  if (unit) {
    range = range.slice(0, -1);
    range = range.split('..').map(n => parseFloat(n));

    return Math.round(unit * (Math.random() * (range[1] - range[0]) + range[0]));
  } else {
    return Date.now();
  }
}
