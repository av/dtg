'use strict';

module.exports = generateFloat;

/**
 * Generates float with given parameters
 *
 * @examples
 *   Upper limit
 *   '2000' -> { 12.12345, 0.0000, 2000.0000 }
 *
 *   Range
 *   '-100..100' -> { -100, 23, 100 }
 */
function generateFloat(expression) {
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
 * Generates float up to given number
 *
 * @param {Number} up
 * @returns {number}
 */
function rand(up) {
  return Math.random() * up;
}