/*
used in app.METHOD to collect paramaters in a unified format and intersperse
watch-dog middleware.


*/

const expressiveMidware = require('./trackingMidware.js');

//flattens a multi-dimensional array to a one-dimensional array
function flatten(array) {
  if (!Array.isArray(array)) return array;
  let result = [];
  array.forEach(el => {
    result = result.concat(flatten(el));
  });
  return result;
}

// accepts the arguments of app.METHOD and returns an object with the path and a
// flattened array with the devMidware.  Used in getAppMethodArgs
function collectMethodArgs(...args) {
  //some express methods take optional non-middleware first parameters, which need to be separated before flattening the rest
  const firstArgIsDevMidware = typeof args[0] === 'function' || (Array.isArray(args[0]) && typeof args[0][0] === 'function'); 
  const firstArg = firstArgIsDevMidware ? null : args[0];
  const devMidware = firstArg === null ? flatten(args) : flatten(args.slice(1));
  return {
    firstArg,
    devMidware
  }
}

//accepts arguments of app.METHOD, uses collectMethods to format devMidware,
//and wraps devMidware with the Expressive tracking midware
//name of previous function is passed
function getAppMethodArgs(args) {
  const { firstArg, devMidware } = collectMethodArgs(...args);
  const newMidware = devMidware.map(key => expressiveMidware(key));
  return firstArg === null ? [...newMidware] : [firstArg, ...newMidware];
}


module.exports = getAppMethodArgs;
