/*
  watchDog.js wraps express, inserting middleware to track how the server
  response and client request objects change as they travel through the developer's
  middleware.

  TODO: figure out where and when to reset the JSON file. right now, the set
  function assumes JSON file is configured
  TODO: test ALL the things!
  TODO: research other routing methods supported by express 
    see: https://expressjs.com/en/api.html#routing-methods
  TODO: figure out how to handle multiple app.method calls for the same method.
  currently it will not be tracked when it goes past the first one.
  TODO: reconfigure listen method for all possible sets and configurations
    of listen arguments
    either (port, [hostname], [backlog], [callback]) or (path, [callback])
  TODO: reconfigure use similarly to above..
  TODO: generally check for need to reconfigure methods in accordance with variety 
    of possible argument arrangements (especially PATH);
*/

const express = require('express'),
      app = express(),
      getAppMethodArgs = require('./util/getAppMethodArgs.js'),
      jsonController = require('./util/jsonController.js'),
      serverListeners = require('./util/serverListeners.js');

function set(method, ...args) {
  const route = args[0];
  jsonController.addRoute(method, route);
  return insertWatchDogMidware(method, ...args);
}

function insertWatchDogMidware(method, ...args) {
  const watchDogMidware = getAppMethodArgs(args);
  return app[method.toLowerCase()](...watchDogMidware);
}

const requestMethods = ['ALL', 'CHECKOUT', 'COPY', 'DELETE', 'GET', 'HEAD', 'LOCK', 'MERGE', 
    'MKACTIVITY', 'MKCOL', 'MOVE', 'M-SEARCH', 'NOTIFY', 'OPTIONS', 'PATCH', 'POST',
    'PURGE', 'PUT', 'REPORT', 'SEARCH', 'SUBSCRIBE', 'TRACE', 'UNLOCK', 'UNSUBSCRIBE'];

const watchDog = () => {
  const watchDogObj = {
    listen: (...args) => {
      const server = app.listen(...args);
      //set up server listeners!
      Object.keys(serverListeners).map(event => {
        server.on(event, serverListeners[event]);
      })
      //sends message to parent process, so that parent process knows it may start
      //firing requests!
      process.send('listening');
      return server;
    },
    use: (...args) => insertWatchDogMidware('use', ...args),
    // disable: () => {},
    // disabled: () => {},
    // enable: () => {},
    // enabled: () => {},
    // engine: () => {},
    // param: () => {},
    // path: () => {},
    // render: () => {},
    // route: () => {},
    // set: () => {}
  }

  //assigns app.METHOD for all methods 
  requestMethods.forEach(method => {
    watchDogObj[method.toLowerCase()] = (...args) => set(method, ...args);
  });
  //assign all properties and methods of the express app to the watchDogObj that
  //aren't explicitly defined
  Object.keys(app).forEach(key => {
    if (!watchDogObj.hasOwnProperty(key)) watchDogObj[key] = app[key];
  });

  return watchDogObj;
}



module.exports = watchDog;
