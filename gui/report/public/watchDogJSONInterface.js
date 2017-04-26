/*
  Client-side utilities for parsing watchDog.json into manageable chucks to hand
  to react components

  TODO: figure out better names for getStateChange and getStateChanges
  TODO: throw some airhorn gun fingers in the air and celebrate because life is
  beautiful
*/

const deepDiff = require('deep-diff').diff;
const wdJSON = require('./../../../watchDog.json');
const getStateChange = require('./../../../util/getStateChange.js');
const config = require('./../../../watchDog.config.js');

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
