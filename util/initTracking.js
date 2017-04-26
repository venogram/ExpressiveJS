/*
  initTracking is middleware that is run once when the server receives a new http request.
  it sets up res.locals._WD and places listeners on the response and request objects.

  TODO: run initTracking on app.listen instead of on individual app.METHOD
    -> Implicated File: ./getAppMethodArgs.js
*/

const takeSnapshot = require('./takeSnapshot.js'),
      onFinished = require('on-finished'),
      reqListeners = require('./reqListeners.js'),
      resListeners = require('./resListeners.js'),
      jsonController = require('./jsonController.js'),
      fs = require('fs');


module.exports = (req, res, next) => {
  const parsed = jsonController.getAndParse();
  
  const now = Date.now();
  const initialState = {
    timestamp: now,
    req: takeSnapshot(req),
    res: takeSnapshot(res)
  };

  const methodRoute = req.method + ' ' + req.route.path;
  
  res.locals._WD[methodRoute] = {
    method: req.method,
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
    jsonController.overwrite(res.locals._WD);
  })

  onFinished(req, (err, req) => {
    //Need to fill in...
  })

  jsonController.overwrite(res.locals._WD);

  return next();
}
