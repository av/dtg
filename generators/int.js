'use strict';

module.exports = generateInt;

/**
 * Generates integer with given parameters
 *
 * @examples
 *   Upper limit
 *   '2000' -> { 1237, 0, 2000 }
 *   
 *   Range
 *   '-100..100' -> { -100, 23, 100 }
 */
function generateInt(expression) {
  var parts = expression.split('..');

  if (parts.length === 2) {
    let bottom = Number(parts[0]);
    let top = Number(parts[1]);

    return rand(top - bottom) + bottom;
  } else {
    return rand(Number(parts[0]));
  }
}

/**
 * Generates int up to given number
 *
 * @param {Number} up
 * @returns {number}
 */
function rand(up) {
  return Math.round(Math.random() * up);
}
