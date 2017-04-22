const takeSnapshot = require('./takeSnapshot.js');
const getStateChange = require('./getStateChange.js');

module.exports = (req, res, next) => {
  res.locals._WD_REQ_SNAPS.push(takeSnapshot(req));
  res.locals._WD_RES_SNAPS.push(takeSnapshot(res));
  const reqChanges = getStateChange(res.locals._WD_REQ_SNAPS));
  const resCHanges = getStateChange(res.locals._WD_RES_SNAPS);

}
