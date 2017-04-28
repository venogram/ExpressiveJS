const jsonController = require('./jsonController.js');

const serverListeners = {
  checkContinue: () => {},
  checkExpectation: () => {},
  clientError: () => {},
  close: (/*accepts no params*/) => {},
  //connect, connection are socket-related
  connect: () => {
    process.send('gotcha');
    console.log('=========connect event!==========');
  },
  connection: () => {
    console.log('=========connectION event!==========');
  },
  request: (req, res) => {},
  upgrade: () => {}
}

module.exports = serverListeners;

