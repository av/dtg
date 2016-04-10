'use strict';

module.exports = {
  isPrimitive: isPrimitive,
  isString: isString,
  isObject: isObject,
  
  copy: copy,
  merge: merge,
  times: times,
  setValue: setValue,
  forEachNode: forEachNode
};

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

/**
 * Deep object traverser, visits each object's node
 *
 * @param {Object|Array} object Object to traverse
 * @param {Function} fn Function to be executed on each node
 * @param {String[]} [path] initial path
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
 * Self-explanatory
 * 
 * @param {Object} $
 * @param {Object} $$
 */
function merge($, $$) {
  let key;
  for (key in $$) {
    if ($$.hasOwnProperty(key)) {
      $[key] = $$[key];
    }
  }
}

function times(value, count) {
  var output = [];
  
  while(count-- > 0) {
    output.push(copy(value));
  }
  
  return output;
}