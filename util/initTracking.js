const takeSnapshot = require('./takeSnapshot.js'),
  reqListeners = require('./reqListeners.js'),
  resListeners = require('./resListeners.js');

module.exports = (req, res, next) => {
  const now = Date.now();
  const initialState = {
    timestamp: now,
    req: takeSnapshot(req),
    res: takeSnapshot(res)
  };
  res.locals._WD = {
    method: req.route.method,
    route: req.route.path,
    timeline: [initialState],
    start: now,
    end: null,
    statusCode: null
  }

  //insert listeners for req, res, other events
}