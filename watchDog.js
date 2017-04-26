/*
  TODO: create a cache containing routes. each time app.METHOD is called, we store
  the route in the cache. this way we have a list of all our routes!
    -> Implicated File: ./util/trackState.js (how to we write all of the routes to the json file?)
  
  TODO: test ALL the things!
*/

const express = require('express'),
      app = express(),
      getAppMethodArgs = require('./util/getAppMethodArgs.js'),
      jsonController = require('./jsonController.js');

function set(method, ...args) {
  const route = args[0];
  jsonController.addRoute(method, route);
  const watchDogMidware = getAppMethodArgs(args);
  return app[method](...watchDogMidware);
}

module.exports = () => {

  const watchDogObj = {

    get: (...args) => set('get', ...args),

    post: (...args) => set('post', ...args),

    put: (...args) => set('put', ...args),

    delete: (...args) => set('delete', ...args),

    listen: (...args) => {
      //Add server listeners
      return app.listen(...args);
    }

  }

  //assign all properties and methods of the express app to the watchDogObj that aren't
  //explicitly defined
  Object.keys(app).forEach(key => {
    if (!watchDogObj.hasOwnProperty(key)) watchDogObj[key] = app[key];
  });

  return watchDogObj;
}
