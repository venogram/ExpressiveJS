
const takeSnapshot = require('./takeSnapshot.js');

//captures state of client request and server response at a given time
// class Snapshot {
//   constructor(req, res/*, funcName, now = Date.now()*/) {
//     // this.prevFunc = funcName;
//     // this.timestamp = now;
//     this.req = takeSnapshot(req);
//     this.res = takeSnapshot(res);
//   }
// }

//stores information on the life of a request including subsequent redirects
// class Report {
//   constructor(req, res, funcName, now = Date.now()) {
//     this.method = req.method;
//     this.route = req.originalUrl;
//     this.start = now;
//     this.end = null;
//     this.duration = null;
//     this.statusCode = null;
//     this.statusMessage = null;
//     this.error = null;
//     this.midware = [funcName];
//     this.timeline = [new Snapshot(req, res, 'initial state', now)];
//     this.redirect = null;
//   }
// }


class Report {
  constructor(req, res, prevFuncName, nextFuncName, isRedirect = false) {
    this.method = req.method;
    this.originalUrl = req.originalUrl;
    this.url = req.url;
    this.isRedirect = isRedirect;
    this.statusCode = res.statusCode;
    this.statusMessage = res.statusMessage;
    this.abandoned = false;
    this.prevFuncName = prevFuncName;
    this.timestamp = Date.now();
    this.snapshot = {
      req: takeSnapshot(req),
      res: takeSnapshot(res)
    }
    this.nextFuncName = nextFuncName;
    this.next = null;
  }
}

module.exports = {/*Snapshot,*/ Report};
