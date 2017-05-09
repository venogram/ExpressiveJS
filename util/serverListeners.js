const jsonController = require('./jsonController.js'),
  expressiveMidware = require('./trackingMidware.js'),
  onFinished = require('on-finished'),
  resListeners = require('./resListeners');

const serverListeners = {
  // checkContinue: () => {},
  // checkExpectation: () => {},
  // clientError: () => {},
  // close: () => {},
  // connect: () => {},
  // connection: () => {},
  request: (req, res) => {
    const ms = Number(process.env.ABANDON_REQ) * 1000;
    let completedBefore = res.locals._XPR ? res.locals._XPR.completedReqs : null;
    if (ms) {
      setTimeout(() => {
        const parsed = jsonController.getAndParse();
        if (completedBefore === parsed.completedReqs) {
          // eval('res.locals._XPR["' + res.locals._XPR.currentRoute.join('"]["') + '"].abandoned = true');
          jsonController.updateCurrentReport(res.locals._XPR, (report) => {
            report.abandoned = true;
          })
          if (process.send) process.send('abandonReq');
          res.end();
          // res.destroy();
        }
      }, ms);
    }

    if (!res.locals._XPR) {
      onFinished(res, resListeners.finish);
    }
  },
  // upgrade: () => {}
}

module.exports = serverListeners;
