const express = require('express');
const app = express();

module.exports = () => {
  return {
    get: (route, devMidware) => {
      return app.get(route, devMidware);
    }
  }
}
