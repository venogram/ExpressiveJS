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
    let validRequest = true;
    let isRedirect = false;
    // no xpr means this is a request to an invalid route (i.e. 404 error)
    if (!xpr) {
      xpr = jsonController.getAndParse();
      validRequest = false;
    }
    // if currentRoute has been defined then request is a redirect
    // otherwise it is a client request
    if (xpr.currentRoute) {
      jsonController.updateCurrentReport(xpr, (report) => {
        report.next = new Report(res.req, res, report.nextFuncName, null, true);
      })
      isRedirect = true;
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



    // let reportDuration;
    // jsonController.updateCurrentReport(xpr, (report) => {
    //   if (validRequest) report.timeline.push(new Snapshot(res.req, res, report.midware[report.midware.length - 1], now));
    //   report.end = now;
    //   reportDuration = report.duration = report.end - report.start;
    //   report.error = err;
    //   report.statusCode = res.statusCode;
    //   report.statusMessage = res.statusMessage;
    // })

    // const finishDuration = Date.now() - now;
    // //increments totalDuration in initial report with duration of current report
    // xpr[xpr.currentRoute[0]].hasOwnProperty('totalDuration') ?
    //   xpr[xpr.currentRoute[0]].totalDuration += reportDuration - finishDuration :
    //   xpr[xpr.currentRoute[0]].totalDuration = reportDuration - finishDuration;

    if (!isRedirect) xpr.completedReqs += 1;
    jsonController.overwrite(xpr);
    if (!isRedirect || !validRequest) process.send('next');
  }

}

module.exports = resListeners;
