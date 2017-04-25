const express = require('express');
const getAppMethodArgs = require('./util/getAppMethodArgs.js');

const app = express();

module.exports = () => {
  return {
    get: (...args) => {
      const watchDogMidware = getAppMethodArgs(args);
      return app.get(...watchDogMidware);
    },

    listen: (...args) => {
      return app.listen(...args);
    }
  }
}
