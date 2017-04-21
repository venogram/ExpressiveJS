const express = require('express');
//const EventEmitter = require('events');
const fs = require('fs');
const deep = require('deep-diff');
const expApp = express();

const obj1 = {
  prop: {name: 'ryan'}
}

const obj2 = {
  prop: {name: 'ryan?'}
}

console.log(deep.diff(obj1, obj2));

function diff(req, res, next) {
  console.log("req.local: ", req.route)
}

const watchDog = () => {
  return {
    get: (route, middleware) => {
      //middleware.map(element => console.log(element.toString()) );

      return expApp.get(route, middleware, diff);
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