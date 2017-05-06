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
          process.send('abandonReq');
          res.end();
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
