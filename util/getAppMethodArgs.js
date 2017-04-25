/*
used in app.METHOD to collect paramaters in a unified format and intersperse
watch-dog middleware.

TODO: run initTracking on app.listen instead of on individual
  -> Implicated File: ./initTracking.js
*/

const initTracking = require('./initTracking.js');
const trackState = require('./trackState.js');

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
// flattened array with the devMidware
// USED IN getAppMethodArgs
function collectMethodArgs(...args) {
  const path = args[0];
  const devMidware = flatten(args.slice(1));
  return {
    path,
    devMidware
  }
}

//accepts arguments of app.METHOD, uses collectMethods to format devMidware,
// and intersperses the watch-dog midware
function getAppMethodArgs(args) {
  const {path, devMidware} = collectMethodArgs(...args);
  const newMidware = [];
  if (devMidware.length) newMidware.push(initTracking);
  while (devMidware.length) {
    newMidware.push(devMidware.shift());
    if (devMidware.length) newMidware.push(trackState);
  }
  return [path, ...newMidware];
}

module.exports = getAppMethodArgs;
