const trackState = require('./trackState.js'),
      initTracking = require('./initTracking.js');

module.exports = {
  checkContinue: () => {},
  checkExpectation: () => {},
  clientError: () => {},
  close: (/*accepts no params*/) => {},
  //connect, connection are socket-related
  connect: () => {},
  connection: () => {},
  request: (req, res) => {
    if (/*req.path matches an existing path*/) {
      initTracking(req, res);
    } else {
      //register 404 error?
    }
  },
  upgrade: () => {}
}