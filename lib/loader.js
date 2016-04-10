'use strict';

// Native Modules
const path = require('path');

// Node Modules
const glob = require('glob');

// Local Modules
const utils = require('./utils');

module.exports = function load($) {
  loadGenerators($);
  loadPlugins($);
};

/**
 * Loads all local generators and merges 
 * them to exports object
 * 
 * @param {Object} $
 */
function loadGenerators($) {
  glob.sync(path.join(__dirname, './generators/*.js'))
    .forEach(generator => {
      $[path.parse(generator).name] = require(generator);
    });
}

/**
 * Loads all plugins for dtg
 * 
 * @param {Object} $
 */
function loadPlugins($) {
  glob.sync(path.join(__dirname, '../../dtg-*/'))
    .forEach(plugin => {
      let plg = require(plugin);
      
      if (utils.isObject(plg)) {
        plg.install($);  
      } else {
        plg($);
      }
      
    });
}