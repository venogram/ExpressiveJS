/*
  watchDog.js wraps express, inserting middleware to track how the server
  response and client request objects change as they travel through the developer's
  middleware.

  TODO: figure out where and when to reset the JSON file. right now, the set
  function assumes JSON file is configured
  TODO: test ALL the things!
*/

const express = require('express'),
      app = express(),
      getAppMethodArgs = require('./util/getAppMethodArgs.js'),
      jsonController = require('./util/jsonController.js'),
      serverListeners = require('./util/serverListeners.js');

function set(method, ...args) {
  const route = args[0];
  jsonController.addRoute(method, route);
  const watchDogMidware = getAppMethodArgs(args);
  return app[method.toLowerCase()](...watchDogMidware);
}

const watchDog = () => {
  const watchDogObj = {
    get: (...args) => set('GET', ...args),
    post: (...args) => set('POST', ...args),
    put: (...args) => set('PUT', ...args),
    delete: (...args) => set('DELETE', ...args),

    listen: (...args) => {
      const server = app.listen(...args);

      //set up server listeners!
      Object.keys(serverListeners).map(event => {
        server.on(event, serverListeners[event]);
      })

      //
      process.send('listening');
      return server;
    }
  }

  //assign all properties and methods of the express app to the watchDogObj that
  //aren't explicitly defined
  Object.keys(app).forEach(key => {
    if (!watchDogObj.hasOwnProperty(key)) watchDogObj[key] = app[key];
  });

  return watchDogObj;
}



module.exports = watchDog;
