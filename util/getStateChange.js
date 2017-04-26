/*
  getStateChange accepts the array of snapshots of either the request or response
  objects and returns an object that holds data on the difference between the
  last two entries

  TODO: filter out changes where the path array ENDS WITH ['locals', '_WD'];
  TODO: as stands, the getStateChange(lhs, rhs).duration counts the time it takes for
  our middleware to write a new json file.
*/

const deepDiff = require('deep-diff').diff;

function getStateChange(lhs, rhs) {
  const start = lhs.timestamp;
  const end = rhs.timestamp;
  const duration = start - end;
  const reqDiff = deepDiff(lhs.req, rhs.req).filter(diffObj => diffObj.path[0] !== 'locals' || diffObj.path[1].indexOf('_WD') !== 0);
  const resDiff = deepDiff(lhs.res, rhs.res).filter(diffObj => diffObj.path[0] !== 'locals' || diffObj.path[1].indexOf('_WD') !== 0);

  return {
    start,
    end,
    duration,
    reqDiff,
    resDiff
  }
}

module.exports = getStateChange;
