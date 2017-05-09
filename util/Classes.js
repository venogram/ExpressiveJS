
const takeSnapshot = require('./takeSnapshot.js');

//captures state of client request and server response at a given time
class Report {
  constructor(req, res, prevFuncName, nextFuncName, isRedirect = false) {
    this.method = req.method;
    this.originalUrl = req.originalUrl;
    this.url = req.url;
    this.statusCode = res.statusCode;
    this.statusMessage = res.statusMessage;
    this.abandoned = false;
    this.complete = req.complete;
    this.isRedirect = isRedirect;
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

module.exports = { Report };
