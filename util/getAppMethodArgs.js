const initTracking = require('./initTracking.js');
const trackState = require('./trackState.js');

function flatten(array) {
  if (!Array.isArray(array)) return array;

  let result = [];
  array.forEach(el => {
    result = result.concat(flatten(el));
  });
  return result;
}

function collectMethodArgs(...args) {
  const path = args[0];
  const devMidware = flatten(args.slice(1));
  return {
    path,
    devMidware
  }
}

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
