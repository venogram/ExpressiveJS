/*
  initTracking is middleware that is run once when the server receives a new http request.
  it sets up res.locals._WD and places listeners on the response and request objects.

  TODO: run initTracking on app.listen instead of on individual
    -> Implicated File: ./getAppMethodArgs.js
*/

const takeSnapshot = require('./takeSnapshot.js'),
  onFinished = require('on-finished');
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
    duration: null,
    statusCode: null,
    statusMessage: null,
    error: null
  }

  onFinished(res, (err, res) => {
    const now = Date.now();
    res.locals._WD.end = now;
    res.locals._WD.duration = res.locals._WD.end - res.locals._WD.start;
    res.locals._WD.error = err;
    res.locals._WD.statusCode = res.statusCode;
    res.locals._WD.statusMessage = res.statusMessage;
    console.log('_WD:', res.locals._WD);
  })

  onFinished(req, (err, req) => {

  })

  return next();
}
