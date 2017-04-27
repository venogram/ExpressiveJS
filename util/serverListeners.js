const trackState = require('./trackState.js'),
      initTracking = require('./initTracking.js'),
      jsonController = require('./jsonController.js');

module.exports = {
  checkContinue: () => {},
  checkExpectation: () => {},
  clientError: () => {},
  close: (/*accepts no params*/) => {},
  //connect, connection are socket-related
  connect: () => {},
  connection: () => {},
  request: (req, res) => {
    initTracking(req, res);
  },
  upgrade: () => {}
}