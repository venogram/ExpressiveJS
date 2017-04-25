/*
  getStateChange accepts the array of snapshots of either the request or response
  objects and returns an object that holds data on the difference between the
  last two entries

  TODO: re-assess format of input to getStateChange (should it take an lhs and rhs
  instead of a single array?)
*/

const deepDiff = require('deep-diff').diff;

function getStateChange(snapshots) {
  // Only compare if there are at least two snapshots!
  if (snapshots.length < 2) throw new Error('Not enough snapshots to compare!');

  const timestamp = Date.now();
  const allChanges = deepDiff(snapshots[snapshots.length - 2], snapshots[snapshots.length - 1]);
  const changes = allChanges.filter(diffObj => diffObj.path[0] !== 'locals' || diffObj.path[1].indexOf('_WD') !== 0);

  return {
    timestamp,
    changes
  }
}

module.exports = getStateChange;
