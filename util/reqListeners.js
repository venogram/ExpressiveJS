/*
  stores listeners to be placed on the request object
*/

const reqListeners = {
  abort: () => {},
  aborted:() => {},
  connect: () => {},
  continue: () => {},
  response: () => {},
  socket: () => {},
  upgrade: () => {},
  //for onFinish? may not need
  finish: (err, req) => {

  }
}

module.exports = reqListeners;
