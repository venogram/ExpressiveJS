/*
  initTracking is middleware that is run once when the server receives a new http request.
  it sets up res.locals._XPR and places listeners on the response and request objects.

  NOTE: expressive.json must already be configured in order for this to function properly!
  TODO: Filter tracking in accordance with config file here
    -> Implicated File: filterSnapshot.js
  TODO: Track redirect path so any additional redirects get added there,
    rather than writing over existing redirect of res.locals._XPR
    -> Maybe be more specific with xpr.currentRoute?  Specify a path?
  TODO: Handle cases where server requests resource from itself
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
//creates a report in json object and in res.locals._XPR
function initTracking(req, res, funcName) {
  const parsed = jsonController.getAndParse();
  const methodRoute = req.method + ' ' + req.originalUrl;
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
  const calledArr = eval('xpr["' + xpr.currentRoute.join('"]["') + '"].midware');
  eval('xpr["' + xpr.currentRoute.join('"]["') + '"].timeline.push(new Snapshot(req, res, calledArr[calledArr.length - 1]))');
  eval('xpr["' + xpr.currentRoute.join('"]["') + '"].midware.push(funcName)');
  jsonController.overwrite(xpr);
}

//fired before first devMiddleware upon a redirected client request
//creates a report in json object and in res.locals._XPR
function initRedirect(req, res, funcName) {
  const parsed = jsonController.getAndParse();
  //updates currentRoute -- an array in the json object storing redirect history
  parsed.currentRoute.push('redirect');
  //We only want to fire initRedirect once per redirected request,
  //so we set isRedirect back to false to avoid repeated calls for same redirect
  parsed[parsed.currentRoute[0]].isRedirect = false;
  //assigns redirect property of current report to a new nested report
  eval('parsed["' + parsed.currentRoute.join('"]["') + '"] = new Report(req, res, funcName)');
  wrapRedirect(res);
  res.locals._XPR = parsed;
  jsonController.overwrite(parsed);
  onFinished(res, resListeners.finish);
}

// //called as part of execution of expressMidware, which wraps developer's midware
// //determines which child tracking midware to fire based on state of json object
// function trackingMidware(req, res, prevFuncName) {
//   console.log
//   //if res.locals has no _XPR property, we know this is a fresh request to app.METHOD
//   if (!res.locals._XPR) {
//     const parsed = jsonController.getAndParse();
//     //isRedirect property in json current report tells us if fresh request is a redirect
//     if (parsed.currentRoute && parsed[parsed.currentRoute[0]].isRedirect) {
//       return initRedirect(req, res, prevFun);
//     }
//     return initTracking(req, res, prevFuncName);
//   }
//   return trackState(req, res, prevFuncName);
// }

function expressiveMidware(func) {
  const funcName = func.name ? func.name : '<anonymous>';
  function midware(req, res, next) {
    if (!res.locals._XPR) {
      const parsed = jsonController.getAndParse();
    //isRedirect property in json current report tells us if fresh request is a redirect
      if (parsed.currentRoute && parsed[parsed.currentRoute[0]].isRedirect) {
        initRedirect(req, res, funcName);
      } else initTracking(req, res, funcName);
    } else {
      trackState(req, res, funcName);
    }
    return func(req, res, next);
  }
  return midware;
}


module.exports = expressiveMidware;
