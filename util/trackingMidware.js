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
    //isRedirect property is stored at currentInfo key in json object
    res.locals._XPR.currentInfo.isRedirect = true;
    jsonController.overwrite(res.locals._XPR);
    return clone(...args);
  }
  res.redirect = newRedirect;
}

//fired before first devMiddleware upon a non-redirected client request
//creates a report in res.locals._XPR and in json object
function initTracking(req, res, nextFuncName, parsed) {
  let methodRoute = req.method + ' ' + req.originalUrl;
  if (parsed[methodRoute]) {
    let newMethodRoute = methodRoute;
    for (let i = 2; parsed[newMethodRoute]; i += 1) {
      newMethodRoute = methodRoute + ' ' + i;
    }
    methodRoute = newMethodRoute;
  }
  parsed.currentInfo.currentRoute = methodRoute;
  parsed[methodRoute] = new Report(req, res, 'initial state', nextFuncName);
  jsonController.overwrite(parsed);
  res.locals._XPR = parsed;
  wrapRedirect(res);
  onFinished(res, resListeners.finish);
}

//fired after each devMiddleware
//updates report timeline with current state of request and response objects
function trackState(req, res, nextFuncName) {
  const xpr = res.locals._XPR;
  jsonController.updateCurrentReport(xpr, (report) => {
    report.next = new Report(req, res, report.nextFuncName, nextFuncName);
  });
  jsonController.overwrite(xpr);
}

//fired before first devMiddleware upon a redirected client request
//creates a report in json object and in res.locals._XPR
function initRedirect(req, res, nextFuncName, parsed) {
  parsed.currentInfo.isRedirect = false;
  jsonController.updateCurrentReport(parsed, (report) => {
    report.next = new Report(req, res, 'initial state', nextFuncName, true);
  });
  res.locals._XPR = parsed;
  jsonController.overwrite(parsed);
  wrapRedirect(res);
  onFinished(res, resListeners.finish);
}


//Wraps developer's midware and determines which child tracking midware
// to fire based on state of json object
function expressiveMidware(func) {
  const nextFuncName = func.name ? func.name : '<anonymous>';
  function trackingMidware(req, res, next) {
    //if res.locals has no _XPR property, this must be a fresh request to app.METHOD
    if (!res.locals._XPR) {
      const parsed = jsonController.getAndParse();
      if (parsed.currentInfo.isRedirect) initRedirect(req, res, nextFuncName, parsed);
      else initTracking(req, res, nextFuncName, parsed);
    }
    else trackState(req, res, nextFuncName);
    //waits for server to possibly respond to request event, then calls developer middleware
    return process.nextTick(() => {
      return func(req, res, next);
    });
  }
  return trackingMidware;
}


module.exports = expressiveMidware;
