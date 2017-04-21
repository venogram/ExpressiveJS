const express = require('express');
//const EventEmitter = require('events');
const fs = require('fs');

const expApp = express();

const watchDog = () => {
  return {
    get: (route, ...middleware) => {
      //const newMiddlewareArr =
      middleware.map(element => console.log(element.toString()) );

      return expApp.get(route, ...middleware);
    },
    use: (middleware) => {
      return expApp.use(middleware);
    },
    listen: (port, callback) => {
      return expApp.listen(port, callback);
    }
  };
  // {
  //   get: (options, callback) => {
  //     const getEmitter = new EventEmitter()
  //     getEmitter.on('res', () => {
  //       console.log("inside emitterfunc");

  //       fs.appendFile('watchDogLog.json', JSON.stringify({
  //         name: "testuser",
  //         password: "test password"
  //       }));
  //     })
  //     const callbackWrap = function (res) {
  //       console.log(res)
  //       //emit triggers
  //       getEmitter.emit('res');
  //       return callback(res)
  //     }
  //     //http.get is an event emitter
  //     //we don't need to create one
  //     //refactor without creating or use our emitter
  //     http.get(options, callbackWrap);
  //   }
  // }

}

module.exports = watchDog;