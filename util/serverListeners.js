const jsonController = require('./jsonController.js');

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

  request: (req, res) => {},

  upgrade: () => {}
}

module.exports = serverListeners;
