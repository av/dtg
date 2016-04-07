module.exports = generatePattern;

/**
 * Generates the random string with given pattern
 * 
 * @examples 
 *  Using control characters
 *  'CC-NN' -> 'FD-99'
 *  
 *  Using control characters mixed with fixed string content
 *  'c"a-f"N' -> 'ea-f0'
 *  
 *  Numbers
 *  'NNNN NNNN' -> '4325 1245'
 *  
 *  HEX Nuumbers
 *  'FFFFFF' -> 'bada12'
 *  
 *  BIN Numbers
 *  'BBBBBB' -> '011011' 
 * 
 * @param pattern
 * @returns {string}
 */
function generatePattern(pattern) {
  var output = '';

  parse(pattern).forEach(function(generator) {
    if (typeof generator === 'string') {
      output += generator;
    } else {
      output += generator();
    }
  });

  return output;
}

/**
 * Stores control characters
 */
const GENERATORS = {
  // Uppercase char
  'C': () => rand('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),

  // Lowercase char
  'c': () => rand('abcdefghijklmnopqrstuvwxyz'),

  // Number 0..9
  'N': () => rand('0123456789'),

  // HEX Number 0..f
  'F': () => rand('0123456789abcdef'),

  // Bit 0,1
  'B': () => rand('01')
};

/**
 * Parses given pattern, returns array of token-generators functions
 *
 * @param {String} pattern
 * @return {Function[]}
 */
function parse(pattern) {
  var generators = [];
  
  pattern.split('').forEach(function(char, index) {
    if (GENERATORS[char])  {
      generators.push(GENERATORS[char]);
    } else {
      if (char === '"') {
        generators.push(
          pattern.substring(index, pattern.indexOf('"', index))
        );
      } else {
        generators.push(char);
      }
    }
  });

  return generators;
}


/**
 * Returns random character from given string
 * 
 * @param string
 */
function rand(string) {
  return string[Math.floor(Math.random() * string.length)];
}