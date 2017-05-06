
const takeSnapshot = require('./takeSnapshot.js');

//captures state of client request and server response at a given time
class Snapshot {
  constructor(req, res, funcName, now = Date.now()) {
    this.prevFunc = funcName;
    this.timestamp = now;
    this.req = takeSnapshot(req);
    this.res = takeSnapshot(res);
  }
}

//stores information on the life of a request including subsequent redirects
class Report {
  constructor(req, res, funcName, now = Date.now()) {
    this.method = req.method;
    this.route = req.originalUrl;
    this.start = now;
    this.end = null;
    this.abandoned = false;
    this.duration = null;
    this.statusCode = null;
    this.statusMessage = null;
    this.error = null;
    this.midware = [funcName];
    this.timeline = [new Snapshot(req, res, 'initial state', now)];
    this.redirect = null;
  }
}

module.exports = {Snapshot, Report};
