/*
  stores listeners to be placed on the response object

*/
const jsonController = require('./jsonController'),
      takeSnapshot = require('./takeSnapshot.js');

class Snapshot {
  constructor(req, res, now = Date.now()) {
    this.timestamp = now;
    this.req = takeSnapshot(req);
    this.res = takeSnapshot(res);
  }
}

const resListeners = {
  finish: (err, res) => {
    const wd = res.locals._WD;
    const now = Date.now();
    const routeLocation = eval('wd["' + wd.currentRoute.join('"]["') + '"]');
    routeLocation.timeline.push(new Snapshot(res.req, res, now));
    routeLocation.end = now;
    routeLocation.duration = routeLocation.end - routeLocation.start;
    routeLocation.error = err;
    routeLocation.statusCode = res.statusCode;
    routeLocation.statusMessage = res.statusMessage;
    wd[wd.currentRoute[0]].hasOwnProperty('totalDuration') ?
      wd[wd.currentRoute[0]].totalDuration += routeLocation.duration :
      wd[wd.currentRoute[0]].totalDuration = routeLocation.duration;
    jsonController.overwrite(wd);
  }
}

module.exports = resListeners;
