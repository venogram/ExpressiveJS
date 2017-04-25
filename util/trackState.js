/*
  trackState is middleware that is placed in between each of the developers middleware.
  it takes a snapshot of the current state of the req and res objects and pushes
  the snapshots into res.locals._WD.timeline

  TODO: fix so that it matches the current format of res.locals._WD
  TODO: write res.locals._WD to watchDog.json
*/

const takeSnapshot = require('./takeSnapshot.js'),
      getStateChange = require('./getStateChange.js');

module.exports = (req, res, next) => {
  res.locals._WD_REQ_SNAPS.push(takeSnapshot(req));
  res.locals._WD_RES_SNAPS.push(takeSnapshot(res));
  const reqChanges = getStateChange(res.locals._WD_REQ_SNAPS);
  const resCHanges = getStateChange(res.locals._WD_RES_SNAPS);

  const wd = res.locals._WD;
  const stateChangeObj = { reqChanges, resChanges };
  wd.timeline.push(stateChangeObj);
}
