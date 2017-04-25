const takeSnapshot = require('./takeSnapshot.js'),
      getStateChange = require('./getStateChange.js');

//Needs fixing once we make initial middleware (fired at initial request)
module.exports = (req, res, next) => {
  res.locals._WD_REQ_SNAPS.push(takeSnapshot(req));
  res.locals._WD_RES_SNAPS.push(takeSnapshot(res));
  const reqChanges = getStateChange(res.locals._WD_REQ_SNAPS);
  const resCHanges = getStateChange(res.locals._WD_RES_SNAPS);

  const wd = res.locals._WD;
  const stateChangeObj = { reqChanges, resChanges };
  wd.timeline.push(stateChangeObj);

}
