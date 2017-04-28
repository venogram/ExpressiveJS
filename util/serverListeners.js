const trackState = require('./trackState.js'),
      initTracking = require('./initTracking.js'),
      jsonController = require('./jsonController.js');

const serverListeners = {
  checkContinue: () => {},
  checkExpectation: () => {},
  clientError: () => {},
  close: (/*accepts no params*/) => {},
  //connect, connection are socket-related
  connect: () => {
  },
  connection: () => {
  },
  request: (req, res) => {
    console.log('request event!');
    initTracking(req, res);
  },
  upgrade: () => {}
}

module.exports = serverListeners;
