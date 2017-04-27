/*
  stores listeners to be placed on the response object

*/
const jsonController = require('./jsonCOntroller');

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
    jsonController.overwrite(res.locals._WD);
  }
}

module.exports = resListeners;
