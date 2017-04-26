/*
  TODO: create a cache containing routes. each time app.METHOD is called, we store
  the route in the cache. this way we have a list of all our routes!
    -> Implicated File: ./util/trackState.js (how to we write all of the routes to the json file?)
*/

const express = require('express');
const getAppMethodArgs = require('./util/getAppMethodArgs.js');

const app = express();

module.exports = () => {
  const watchDogObj = {
    get: (...args) => {

      const watchDogMidware = getAppMethodArgs(args);
      return app.get(...watchDogMidware);
    },

    listen: (...args) => {
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
