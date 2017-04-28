/*
  initTracking is middleware that is run once when the server receives a new http request.
  it sets up res.locals._WD and places listeners on the response and request objects.

  NOTE: watchDog.json must already be configured in order for this to function properly!
  TODO: Filter tracking in accordance with config file here
    -> Implicated File: filterSnapshot.js
  TODO: Track redirect path so any additional redirects get added there,
    rather than writing over existing redirect of res.locals._WD
    -> Maybe be more specific with wd.currentRoute?  Specify a path?
*/

const takeSnapshot = require('./takeSnapshot.js'),
      onFinished = require('on-finished'),
      reqListeners = require('./reqListeners.js'),
      resListeners = require('./resListeners.js'),
      jsonController = require('./jsonController.js'),
      fs = require('fs'),
      path = require('path');


class Snapshot {
  constructor(req, res, now = Date.now()) {
    this.timestamp = now;
    this.req = takeSnapshot(req);
    this.res = takeSnapshot(res);
  }
}

class Report {
  constructor(req, res, now = Date.now()) {
    this.method = req.method;
    this.route = req.route.path;
    this.timeline = [new Snapshot(req, res, now)];
    this.start = now;
    this.end = null;
    this.duration = null;
    this.statusCode = null;
    this.statusMessage = null;
    this.error = null;
    this.redirect = null;
  }
}


function initTracking(req, res, next) {
  const parsed = jsonController.getAndParse();
  const methodRoute = req.method + ' ' + req.route.path;
  parsed.currentRoute = [methodRoute];
  parsed[methodRoute] = new Report(req, res);
  jsonController.overwrite(parsed);
  res.locals._WD = parsed;
  onFinished(res, resListeners.finish)
  return next();
}


function trackState(req, res, next) {
  const wd = res.locals._WD;
  eval('wd["' + wd.currentRoute.join('"]["') + '"].timeline.push(new Snapshot(req, res)');
  jsonController.overwrite(wd);
  return next();
}


function initRedirect(req, res, next) {
  const wd = res.locals._WD;
  //updates current route
  wd.currentRoute.push['redirect'];
  //currentRoute is an array that tracks redirect history
  eval('wd["' + wd.currentRoute.join('"]["') + '"] = new Report(req, res))');
  jsonController.overwrite(wd);
  return next();
}

function isRedirect(req) {
  //return boolean value to determine if request is a redirect
}


function trackingMidware(req, res, next) {
  res.locals._WD ? initRedirect(req, res, next) :
  isRedirect(req) ? trackstate(req, res, next) : initTracking(req, res, next);
}


module.exports = trackingMidware;