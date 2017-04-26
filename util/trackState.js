/*
  trackState is middleware that is placed in between each of the developers middleware.
  it takes a snapshot of the current state of the req and res objects and pushes
  the snapshots into res.locals._WD.timeline

  TODO: fix so that it matches the current format of res.locals._WD
  TODO: write res.locals._WD to watchDog.json
*/

const takeSnapshot = require('./takeSnapshot.js'),
      fs = require('fs'),
      path = require('path');

module.exports = (req, res, next) => {
  const now = Date.now();
  const wd = res.locals._WD;
  const snapshot = {
    timestamp: now,
    req: takeSnapshot(req),
    res: takeSnapshot(res)
  }
  wd.timeline.push(snapshot);
  console.log(wd);
  fs.writeFile(path.join(__dirname, './../watchDog.json'), JSON.stringify(wd), (err) => {
    if (err) throw err;
    console.log('wrote file!!');
  });
  if (next) next();
}
