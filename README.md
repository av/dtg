![DTG](https://img42.com/bkCep+)

## What's DTG?

DTG - DaTa Generator, allows you to develop your data generation scripts faster

## Terms

+ dtg - tool for data generation
+ template - javascript object containing fields with generation operators
+ generation operator - string strating with '$'
+ plugin - code, existing in a sibling folder of dtg installation, which exports `install` function

## Installation

```bash
npm install dtg
```

## Usage

```javascript
const gen = require('dtg').generate;
const template = {
    {
        // Will be kept as is in output objects
        type: '_ShipmentOrder',

        // The same, will not be modified
        timestamp: Date.now(),

        // It's possible to put generation operators in the any
        // place in object, except field's name
        tags: ['some', '$pattern:NN-CC'],
        customFields: {

            // Timestamp generator, will produce timestamp, from one to two months ago
            shipment_date: `$timestamp: 1..2M ago`,

            // Will chose random value from given array
            shipment_order: `$enum: ['EZ-104', 'BD-103', 'SO12', 'FDk2', 'DZ-105']`,
            shipment_to_code: `$enum: ['14RD', '13SD', '22LD', '45SA', '14RA', '21SO', '56LS']`,

            // Will produce random int in given range, floats supported via
            // $float generation operator
            quantity: `$int: 10..100`
      }
    }
};

let actions = [];

while (actions.length < 100) {
    // Will produce 100 diferrent objects from template given.
    actions.push(gen(template));
}

```

## Plugins

DTG loads plugins automatically. The only place to locate them is a sibling folder of a dtg installation itself.
E.g.
```
/node_modules
  /dtg
  /dtg-plugin
```
Plugin must have either export a function or `install` field with function value in its exports. The function will retrieve the main DTG object when called and therefore do whatever needed.
E.g.
```
module.exports = {
    install: function(dtg) {
        dtg['curl'] = require('./curl-generator')
    }
}

module.exports = function(dtg) {
    dtg['search-results'] = require('google-connector');
}
```
