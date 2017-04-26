/*
  This file contains methods that turn deepDiff objects into human-readable
  summaries of the differences.
*/

const JSONInterface = require('./watchDogJSONInterface.js');
const wdJSON = require('./../../../watchDog.json');

const summaries = {
  getSummary: (diffObj) => {
    const path = '.' + diffObj.path.join('.');
    let summary = path;

    if (diffObj.kind === 'E' || diffObj.kind === 'E') {
      summary += ` changed from ${diffObj.lhs} to ${diffObj.rhs}`;
    } else if (diffObj.kind === 'E') {
      summary += ` deleted`;
    } else {
      summary += ` initialized to ${diffObj.rhs}`;
    }

    return summary;
  },

  getSummaries: (stateChangesArr) => {
    const result = {
      reqSummaries: [],
      resSummaries: []
    }
    stateChangesArr.forEach((stateChange) => {
      Object.keys(stateChange.resDiff).forEach(path => {
        result.resSummaries.push(summaries.getSummary(stateChange.resDiff[path]));
      });
      Object.keys(stateChange.reqDiff).forEach(path => {
        result.reqSummaries.push(summaries.getSummary(stateChange.reqDiff[path]))
      });
    });
    return result;
  }
}



module.exports = summaries;
