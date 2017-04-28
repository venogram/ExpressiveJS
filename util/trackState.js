/*
  trackState is middleware that is placed in between each of the developers middleware.
  it takes a snapshot of the current state of the req and res objects and pushes
  the snapshots into res.locals._WD.timeline
*/

const takeSnapshot = require('./takeSnapshot.js'),
      fs = require('fs'),
      path = require('path'),
      jsonController = require('./jsonController.js');

module.exports = (req, res, next) => {
  const now = Date.now();
  const methodRoute = res.locals._WD.currentRoute;
  const report = res.locals._WD[methodRoute];

  const snapshot = {
    timestamp: now,
    req: takeSnapshot(req),
    res: takeSnapshot(res)
  }
  report.timeline.push(snapshot);
  jsonController.overwrite(res.locals._WD);
  if (next) next();
}
