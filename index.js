'use strict';

module.exports = {
  generate: generate
};

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
  var output = copy(template);

  forEachNode(template, (value, parent, path) => {
    if (isString(value)) {
      setValue(output, path, parse(value));
    }
  });
  
  return output;
}

/**
 * Stores generators
 */
const $ = {
  'enum': require('./generators/enum'),
  'float': require('./generators/float'),
  'int': require('./generators/int'),
  'pattern': require('./generators/pattern'),
  'timestamp': require('./generators/timestamp')
};


/**
 * Deep object traverser, visits each object's node
 *
 * @param {Object|Array} object Object to traverse
 * @param {Function} fn Function to be executed on each node
 * @param {String[]|Undefined} path initial path
 */
function forEachNode(object, fn, path) {
  let key;
  let currentPath = Array.from(path || []);

  for (key in object) {
    let path = currentPath.concat([key]);

    if (object.hasOwnProperty(key)) {
      if (isPrimitive(object[key])) {
        fn(object[key], object, path);
      } else {
        if (isObject(object[key])) {
          forEachNode(object[key], fn, path);
        }
      }
    }
  }
}

/**
 * Parses the given node value, detecting and executing generators
 *
 * @param {String} value
 */
function parse(value) {
  if (value.trim().startsWith('$')) {
    let parts = value.split(':');
    let generator = $[parts[0].trim().substring(1)];

    if (generator) {
      return generator(parts[1].trim());
    } else {
      return value;
    }
  } else {
    return value;
  }
}

/**
 * Returns true if given value is of primitive type
 *
 * @param {*} value
 * @returns {boolean}
 */
function isPrimitive(value) {
  return typeof value !== 'object' && typeof value !== 'function';
}

/**
 * Returns true if given value has string type
 * @param {*} value
 * @returns {boolean}
 */
function isString(value) {
  return typeof value === 'string';
}

/**
 * Returns true if given value is object(-like)
 *
 * @param {*} value
 * @returns {boolean}
 */
function isObject(value) {
  return typeof value === 'object';
}

/**
 * Deep plain object copy
 *
 * @param {*} obj
 */
function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Sets given value to given object by given path.
 *
 * @param {Array|Object} object
 * @param {String[]} path
 * @param {*}value
 */
function setValue(object, path, value) {
  let target = object;
  let way = Array.from(path);

  while(way.length > 1)
    target = target[way.shift()];

  target[way[0]] = value;
}