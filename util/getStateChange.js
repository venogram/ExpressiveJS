/*
  getStateChange accepts the array of snapshots of either the request or response
  objects and returns an object that holds data on the difference between the
  last two entries

  TODO: RIGHT NOW, getStateChanges only gets the changes for things listed in the
  config file. do we want getStateChanges to do this filtering, or the client side
  JSONInterface ???
  TODO: as stands, the getStateChange(lhs, rhs).duration counts the time it takes for
  our middleware to write a new json file.
*/

const deepDiff = require('deep-diff').diff;
const config = require('./../watchDog.config.js');

function getStateChange(lhs, rhs) {
  const start = lhs.timestamp;
  const end = rhs.timestamp;
  const duration = end - start;
  const reqDiff = deepDiff(lhs.req, rhs.req).reduce((result, diff) => {
    let path = diff.path.join('.');

    const inConfig = config.reqWatch.reduce((boolean, configPath) => {
      return boolean ? true : path.search(configPath) > -1;
    },false);

    if (inConfig) result[path] = diff;

    return result;
  }, {});
  const resDiff = deepDiff(lhs.res, rhs.res).reduce((result, diff) => {
    let path = '.' + diff.path.join('.');

    //does config.resWatch contain a string that matches the beginning of path
    const inConfig = config.resWatch.reduce((boolean, configPath) => {
      return boolean ? true : path.search(configPath) > -1;
    },false);

    if (inConfig) result[path] = diff;
    return result;
  }, {});
  return {
    start,
    end,
    duration,
    reqDiff,
    resDiff
  }
}

module.exports = getStateChange;
