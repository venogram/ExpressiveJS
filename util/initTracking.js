/*
  initTracking is middleware that is run once when the server receives a new http request.
  it sets up res.locals._WD and places listeners on the response and request objects.

  NOTE: watchDog.json must already be configured in order for this to function properly!

  TODO: run initTracking on app.listen instead of on individual app.METHOD
    -> Implicated File: ./getAppMethodArgs.js
  TODO: take redirects into account! see line 25.
*/

const takeSnapshot = require('./takeSnapshot.js'),
      onFinished = require('on-finished'),
      reqListeners = require('./reqListeners.js'),
      resListeners = require('./resListeners.js'),
      jsonController = require('./jsonController.js'),
      fs = require('fs');

const initTracking = (req, res) => {
  console.log('INIT TRACKING WAS CALLED');
  const parsed = jsonController.getAndParse();
  const methodRoute = req.method + ' ' + req.route.path;
  res.locals._WD = parsed;
  res.locals._WD.currentRoute = methodRoute;
  console.log(res.locals._WD);


  //this is where we check redirect count! For now we assume redirect count is 0;

  const now = Date.now();
  const initialState = {
    timestamp: now,
    req: takeSnapshot(req),
    res: takeSnapshot(res)
  };

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


  onFinished(res, resListeners.finish)


  jsonController.overwrite(res.locals._WD);
}



module.exports = initTracking;
