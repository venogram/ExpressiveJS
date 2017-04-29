/*
  Client-side utilities for parsing expressive.json into manageable chucks to hand
  to react components

  TODO: figure out better names for getStateChange and getStateChanges
  TODO: expressive.json format isn't stable - make sure the functions take relevant input
*/

const deepDiff = require('deep-diff').diff;
//const ourJSON = require('./../../../expressive.json');
const getStateChange = require('./../../../util/getStateChange.js');

const JSONInterface = {
  getStateChanges: (xprJSON) => {
    const timeline = xprJSON.timeline;

    //console.log("timeline from JSON Interface", timeline)

    if (!Array.isArray(timeline)) throw new Error('getStateChanges received unexpected input');
    if (timeline.length < 2) return [];

    return timeline.reduce((changes, past, ind) => {
      if (ind === timeline.length - 1) return changes;
      changes.push(getStateChange(past, timeline[ind + 1]));
      return changes;
    },[])
  },

};


module.exports = JSONInterface;
