/*
  stores listeners to be placed on the response object

*/
const jsonController = require('./jsonController');
const takeSnapshot = require('./takeSnapshot.js');
const Classes = require('./Classes.js');
const Snapshot = Classes.Snapshot;
const Report = Classes.Report;


const resListeners = {
  //passed as callback into onFinish
  finish: (err, res) => {
    const now = Date.now();
    let xpr = res.locals._XPR;
    //no xpr means this is either a fresh client request or a redirect
    if (!xpr) {
      const parsed = jsonController.getAndParse();
      //No current route means this is a fresh client request
      if (!parsed.currentRoute) {
        const methodRoute = res.req.method + ' ' + res.req.originalUrl;
        parsed.currentRoute = [methodRoute];
        parsed[methodRoute] = new Report(res.req, res, 'initial state', now);
      }
      xpr = parsed;
    }
    //follows linked list of nested reports to find current report
    const routeLocation = eval('xpr["' + xpr.currentRoute.join('"]["') + '"]');

    //updates current report with completion information
    routeLocation.timeline.push(new Snapshot(res.req, res, routeLocation.midware[routeLocation.midware.length - 1], now));
    routeLocation.end = now;
    routeLocation.duration = routeLocation.end - routeLocation.start;
    routeLocation.error = err;
    routeLocation.statusCode = res.statusCode;
    routeLocation.statusMessage = res.statusMessage;

    //increments totalDuration in initial report with duration of current report
    xpr[xpr.currentRoute[0]].hasOwnProperty('totalDuration') ?
      xpr[xpr.currentRoute[0]].totalDuration += routeLocation.duration :
      xpr[xpr.currentRoute[0]].totalDuration = routeLocation.duration;

    jsonController.overwrite(xpr);
    if (!xpr[xpr.currentRoute[0]].isRedirect) process.send('next');
  }
}

module.exports = resListeners;
