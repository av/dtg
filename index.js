'use strict';

require('./lib/loader')(module.exports = {
  generate: generate,
  parse: parse
});

const utils = require('./lib/utils');

/**
 * Takes a template object and returns object filled with generated values.
 *
 * @example
 *
 * {
 *   type: '_ShipmentOrder',
 *   timestamp: Date.now(),
 *   tags: ['some', '$pattern:NN-CC'],
 *   customFields: {
 *     shipment_date: `$timestamp: 1..2M ago`,
 *     shipment_order: `$enum: ['EZ-104', 'BD-103', 'SO12', 'FDk2', 'DZ-105']`,
 *     shipment_to_code: `$enum: ['14RD', '13SD', '22LD', '45SA', '14RA', '21SO', '56LS']`,
 *     quantity: `$int: 10..100`
 *   }
 * }
 *
 * @params {Object|Array} template
 * @returns {Object|Array}
 */
function generate(template) {
  var output = utils.copy(template);

  utils.forEachNode(template, (value, parent, path) => {
    if (utils.isString(value)) {
      utils.setValue(output, path, parse(value));
    }
  });
  
  return output;
}

/**
 * Parses the given node value, detecting and executing generators
 *
 * @param {String} value
 */
function parse(value) {
  if (value.trim().startsWith('$')) {
    let parts = value.split(':');
    let generator = module.exports[parts.shift().trim().substring(1)];

    if (generator) {
      return generator(parts.join(':').trim());
    } else {
      return value;
    }
  } else {
    return value;
  }
}