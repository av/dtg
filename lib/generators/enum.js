module.exports = generateEnum;

/**
 * Generates one of predefined values,
 * Basically just picks one of passed parameters.
 * 
 * @example 
 *   ['1', '2', '3'] -> 1, 2, 3
 *   [{a: 1}, {a: 2}, {col: true}] -> {a: 1}, {col: true}
 */
function generateEnum(values) {
  values = eval(values);

  return values[Math.floor(Math.random() * values.length)];
}