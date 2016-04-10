'use strict';

const generator = require('../../index');
const utils = require('../utils');

module.exports = generateArr;

/**
 * @examples
 *  
 *  '20 of { id: `$pattern: "0x"FFFFFF`}' -> Array with twenty objects, like { id: '0xdafa9b' }
 *  '20 of `$int: 1..100`' -> Array of twenty random ints
 *  
 */
function generateArr(source) {
  let parts = source.split('of').map(part => part.trim());
  
  let count = parseInt(parts[0]);
  let template = eval('(' + parts[1] + ')');
  let output = [];

  if (utils.isString(template)) {
    while (count--) {
      output.push(generator.parse(template));
    }
  } else if (utils.isObject(template)) {
    while (count--) {
      output.push(generator.generate(template));
    }
  }

  return output;
}