/*
  stores listeners to be placed on the response object

  TODO: Should resListeners.finish write to the JSON ?
*/


const resListeners = {
  finish: (err, res) => {
    const now = Date.now();
    const methodRoute = res.locals._WD.currentRoute;
    const report = res.locals._WD[methodRoute];
    report.end = now;
    report.duration = report.end - report.start;
    report.error = err;
    report.statusCode = res.statusCode;
    report.statusMessage = res.statusMessage;
  }
}

module.exports = resListeners;
