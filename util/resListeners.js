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
    let xpr = res.locals._XPR;
    // no xpr means this is request has not been tracked 
    // therefore it must be a request to an invalid route (i.e. 404 error)
    const validRequest = xpr ? true : false;
    if (!xpr) xpr = jsonController.getAndParse();
    const isRedirect = xpr.currentInfo.isRedirect;
    // no current Route means this is a fresh request to an invalid route
    if (xpr.currentInfo.currentRoute) {
      jsonController.updateCurrentReport(xpr, (report) => {
        report.next = new Report(res.req, res, report.nextFuncName, null);
      })
    } else {
      let methodRoute = res.req.method + ' ' + res.req.originalUrl;
      if (xpr[methodRoute]) {
        let newMethodRoute = methodRoute;
        for (let i = 2; xpr[newMethodRoute]; i += 1) {
          newMethodRoute = methodRoute + ' ' + i;
        }
        methodRoute = newMethodRoute;
      }
      xpr.currentRoute = methodRoute;
      xpr[methodRoute] = new Report(req, res, 'initial state', null);
    }

    if (!isRedirect) xpr.completedReqs += 1;
    jsonController.overwrite(xpr);
    if (!isRedirect || !validRequest) process.send('next');
  }

}

module.exports = resListeners;
