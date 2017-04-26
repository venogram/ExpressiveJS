const deepDiff = require('deep-diff').diff;
const wdJSON = require('./../../../watchDog.json');
const getStateChange = require('./../../../util/getStateChange.js');

const JSONInterface = {
  getStateChanges: (wdJSON) => {
    const timeline = wdJSON.timeline;

    if (!Array.isArray(timeline)) throw new Error('getStateChanges received unexpected input');
    if (timeline.length < 2) return [];

    return timeline.reduce((changes, past, ind) => {
      if (ind === timeline.length - 1) return changes;
      changes.push(getStateChange(past, timeline[ind + 1]));
      return changes;
    },[])
  },

  getHighlights: (wdJSON) => {

  }
};

console.log(JSONInterface.getStateChanges(wdJSON)[0].reqDiff);

module.exports = JSONInterface;
