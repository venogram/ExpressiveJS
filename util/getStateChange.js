/*
  getStateChange accepts two Snapshots and returns an object that holds data on
  the difference between the last two entries

  TODO: as stands, the getStateChange(lhs, rhs).duration counts the time it
  takes for our middleware to write a new json file.
*/

const deepDiff = require('deep-diff').diff;
const config = require('./../watchDog.config.js');

//getConfigDiffs accepts an array of diff objects and returns an object
//  -> getConfigDiffs filters out diffs that the config file doesn't specify we should watch
//  -> the return object has keys that correspond to the path within the req/res object that the
//     change occured at. the value stored at each key is a deepDiff object (see npm deep-diff docs)
function getConfigDiffs(diffArr) {
  return diffArr.reduce((result, diff) => {
    let path = diff.path.join('.');

    const inConfig = config.reqWatch.reduce((boolean, configPath) => {
      return boolean ? true : path.search(configPath) > -1;
    },false);

    if (inConfig) result[path] = diff;

    return result;
  }, {})
}

// accepts two Snapshots (lhs is 'before', rhs is 'after') and returns an object
// with info on the changes
function getStateChange(lhs, rhs) {
  const start = lhs.timestamp;
  const end = rhs.timestamp;
  const duration = end - start;
  const reqDiff = getConfigDiffs(deepDiff(lhs.req, rhs.req));
  const resDiff = getConfigDiffs(deepDiff(lhs.res, rhs.res));

  return {
    start,
    end,
    duration,
    reqDiff,
    resDiff
  }
}

module.exports = getStateChange;
