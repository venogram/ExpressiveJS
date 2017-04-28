/*
  initTracking is middleware that is run once when the server receives a new http request.
  it sets up res.locals._WD and places listeners on the response and request objects.

  NOTE: watchDog.json must already be configured in order for this to function properly!
  TODO: Filter tracking in accordance with config file here
    -> Implicated File: filterSnapshot.js
  TODO: Track redirect path so any additional redirects get added there,
    rather than writing over existing redirect of res.locals._WD
    -> Maybe be more specific with wd.currentRoute?  Specify a path?
  TODO: Handle cases where server requests resource from itself
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
    this.route = req.url;
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

function wrapRedirect(res) {
  // const original = res.redirect;
  // console.log(original);
  // const newRedirect = (...args) => {
  //   res.locals._WD.redirectCount += 1;
  //   return original(...args);
  // }
  // res.redirect = newRedirect;
}


function initTracking(req, res, next) {
  const parsed = jsonController.getAndParse();
  const methodRoute = req.method + ' ' + req.url;
  parsed.currentRoute = [methodRoute];
  parsed[methodRoute] = new Report(req, res);
  parsed.redirectCount = 0;
  wrapRedirect(res);
  jsonController.overwrite(parsed);
  res.locals._WD = parsed;
  onFinished(res, resListeners.finish)
  return next();
}


function trackState(req, res, next) {
  const wd = res.locals._WD;
  eval('wd["' + wd.currentRoute.join('"]["') + '"].timeline.push(new Snapshot(req, res))');
  jsonController.overwrite(wd);
  return next();
}


function initRedirect(req, res, next) {
  const wd = jsonController.getAndParse();
  //updates current route
  wd.currentRoute.push['redirect'];
  wd.redirectCount += 1;
  wrapRedirect(res);
  //currentRoute is an array that tracks redirect history
  eval('wd["' + wd.currentRoute.join('"]["') + '"] = new Report(req, res))');
  jsonController.overwrite(wd);
  return next();
}

function isRedirect(req) {
  //return boolean value to determine if request is a redirect
}

//may need some fixing
function trackingMidware(req, res, next) {
  if (res.locals._WD) {
    // if (isRedirect(req)) return initRedirect(req, res, next);
    return trackState(req, res, next);
  }
  return initTracking(req, res, next);
}


module.exports = trackingMidware;