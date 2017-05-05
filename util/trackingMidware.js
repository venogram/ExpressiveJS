/*
  initTracking is middleware that is run once when the server receives a new http request.
  it sets up res.locals._XPR and places listeners on the response and request objects.

  NOTE: expressive.json must already be configured in order for this to function properly!
*/

const takeSnapshot = require('./takeSnapshot.js');
const onFinished = require('on-finished');
const reqListeners = require('./reqListeners.js');
const resListeners = require('./resListeners.js');
const jsonController = require('./jsonController.js');
const fs = require('fs');
const path = require('path');
const Classes = require('./Classes.js');
const Snapshot = Classes.Snapshot;
const Report = Classes.Report;


//wraps red.redirect method to write to the json file that a redirect just occurred
function wrapRedirect(res) {
  const clone = res.redirect.bind(res);
  function newRedirect(...args) {
    //isRedirect property is stored at top-level report for current methodRoute key
    res.locals._XPR[res.locals._XPR.currentRoute[0]].isRedirect = true;
    jsonController.overwrite(res.locals._XPR);
    return clone(...args);
  }
  res.redirect = newRedirect;
}

//fired before first devMiddleware upon a non-redirected client request
//creates a report in res.locals._XPR and in json object
function initTracking(req, res, funcName) {
  const parsed = jsonController.getAndParse();
  let methodRoute = req.method + ' ' + req.originalUrl;
  if (parsed[methodRoute]) {
    let newMethodRoute = methodRoute
    for (let i = 1; parsed[newMethodRoute]; i += 1) {
      newMethodRoute = methodRoute + ' ' + i;
    }
    methodRoute = newMethodRoute;
  }
  parsed.currentRoute = [methodRoute];
  parsed[methodRoute] = new Report(req, res, funcName);
  parsed[methodRoute].isRedirect = false;
  wrapRedirect(res);
  jsonController.overwrite(parsed);
  res.locals._XPR = parsed;
  onFinished(res, resListeners.finish);
}

//fired after each devMiddleware
//updates report timeline with current state of request and response objects
function trackState(req, res, funcName) {
  const xpr = res.locals._XPR;
  jsonController.updateCurrentReport(xpr, (report) => {
    report.timeline.push(new Snapshot(req, res, report.midware[report.midware.length - 1]));
    report.midware.push(funcName);
  });
  jsonController.overwrite(xpr);
}

//fired before first devMiddleware upon a redirected client request
//creates a report in json object and in res.locals._XPR
function initRedirect(req, res, funcName) {
  const parsed = jsonController.getAndParse();
  //InitRedirect should only fire once per redirected request,
  //so isRedirect is set back to false to avoid repeated initRedirect calls for same redirect
  parsed[parsed.currentRoute[0]].isRedirect = false;
  //assigns redirect property of current report to a new nested report
  jsonController.updateCurrentReport(parsed, (report) => {
    report.redirect = new Report(req, res, funcName);
  })
  //updates currentRoute -- an array in the json object storing redirect history
  parsed.currentRoute.push('redirect');
  wrapRedirect(res);
  res.locals._XPR = parsed;
  jsonController.overwrite(parsed);
  onFinished(res, resListeners.finish);
}


//Wraps developer's midware and determines which child tracking midware
// to fire based on state of json object
function expressiveMidware(func) {
  const funcName = func.name ? func.name : '<anonymous>';
  function trackingMidware(req, res, next) {
    const startTime = Date.now();
    //if res.locals has no _XPR property, we know this is a fresh request to app.METHOD
    if (!res.locals._XPR) {
      const parsed = jsonController.getAndParse();
    //isRedirect property in json current report tells us if fresh request is a redirect
      if (parsed.currentRoute && parsed[parsed.currentRoute[0]].isRedirect) {
        initRedirect(req, res, funcName);
      } else {
        initTracking(req, res, funcName);
      }
    } else {
      trackState(req, res, funcName);
    }
    //waits for server to possibly respond to request event
    //then subtracts expressMidware time from totalDuration for current route being tested
    return process.nextTick(() => {
      const updated = jsonController.getAndParse();
      let exists = updated[updated.currentRoute[0]].totalDuration !== undefined;
      exists ? exists -= (Date.now() - startTime) : updated[updated.currentRoute[0]].totalDuration = (-1 * (Date.now() - startTime));
      jsonController.overwrite(updated);
      return func(req, res, next);
    });
  }
  return trackingMidware;
}


module.exports = expressiveMidware;
