/*
  this function returns a deep clone of objects that may contain circular references
  the clone DOES NOT include any methods/functions

  TODO: use config file to only snapshot the relevant info
  NOTE: config file isn't stable and we may need to change how we use it!
  PROCEED WITH CAUTION
*/

const config = require('./../default.config.js');

function takeSnapshot(original, map = new WeakMap()) {
  const dataTypes = ['object', 'number', 'string', 'boolean', 'undefined'];
  const primitives = ['number', 'string', 'boolean', 'undefined'];
  const isPrimitive = primitives.includes(typeof original) || original === null;

  //Throw an error if we recieve an unexpected datatype
  if (!dataTypes.includes(typeof original)) throw new Error('takeSnapshot: invalid input');
  //Basecase: input is a primitive data type
  if (isPrimitive) return original;
  //Basecase: original has already been cloned
  if (map.has(original)) return null//map.get(original);

  const copy = Array.isArray(original) ? [] : {};
  //Set map[original] to the copy to avoid recursing infinitely through a circular reference
  map.set(original, copy);

  //loop through the original to build the copy
  Object.keys(original).forEach(key => {
    if (Array.isArray(copy) && dataTypes.includes(typeof original[key])) {
      copy.push(takeSnapshot(original[key], map));
    } else if (dataTypes.includes(typeof original[key]) && key !== '_XPR') {
      copy[key] = takeSnapshot(original[key], map);
    }
  });
  return copy;
}

module.exports = takeSnapshot;
