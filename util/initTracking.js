const takeSnapshot = require('./takeSnapshot.js'),
      reqListeners = require('./reqListeners.js'),
      resListeners = require('./resListeners.js');

module.exports = (req, res, next) => {
  res.locals._WD = {
    method: req.route.method,
    route: req.route.path,
    initialState: {
      req: takeSnapshot(req),
      res: takeSnapshot(res)
    },
    timeline: [],
    start: Date.now(),
    end: null,
    statusCode: null
  }

  //insert listeners for req, res events
}