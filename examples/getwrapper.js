const http = require('http');
const EventEmitter = require('events');
const fs = require('fs');
const watchDog = {
  get: (options, callback) => {
    const getEmitter = new EventEmitter()
    getEmitter.on('res', () =>{
      console.log("inside emitterfunc")
      fs.writeFile('watchDogLog.txt','response recieved');
    })
    const callbackWrap = function (res) {
      getEmitter.emit('res');
      return callback(res)
    }
    //http.get is an event emitter
    //we don't need to create one 
    //refactor without creating or use our emitter
    http.get(options, callbackWrap)

  }
}

module.exports = watchDog;