const jsonController = require('./jsonController.js'),
  expressiveMidware = require('./trackingMidware.js'),
  onFinished = require('on-finished'),
  resListeners = require('./resListeners');

const serverListeners = {
  request: (req, res) => {
    let xpr = res.locals._XPR;
    let completedBefore = xpr ? xpr.completedReqs : null;
    const ms = Number(process.env.ABANDON_REQ) * 1000;
    if (ms) {
      setTimeout(() => {
        const parsed = jsonController.getAndParse();
        if (completedBefore === parsed.completedReqs) {

          //let onFinish know that xpr is abandoning the request
          xpr.currentInfo.isAbandoned = true;
          res.status(504).end();

        }
      }, ms);
    }

    if (!res.locals._XPR) {
      onFinished(res, resListeners.finish);
    }
  },
  // checkContinue: () => {},
  // checkExpectation: () => {},
  // clientError: () => {},
  // close: () => {},
  // connect: () => {},
  // connection: () => {},
  // upgrade: () => {}
}

module.exports = serverListeners;
