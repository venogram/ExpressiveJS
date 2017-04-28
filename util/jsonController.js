/*
TODO: test all methods in this file


*/


const fs = require('fs');
const path = require('path');

const jsonController = {

  //Returns parsed JSON file
  getAndParse: () => {
    const json = fs.readFileSync(path.join(__dirname, './../watchDog.json'));
    return JSON.parse(json);
  },

  //Creates skeleton JSON file
  createJSON: () => {
    const skeleton = { routes: {} };
    jsonController.overwrite(skeleton);
  },

  //Stores a route and request method that the server is listening for
  addRoute: (method, route) => {
    const parsed = jsonController.getAndParse();
    if (!parsed.routes[method]) {
      parsed.routes[method] = [route];
      jsonController.overwrite(parsed);
    } else if (!parsed.routes[method].includes(route)) {
      parsed.routes[method].push(route);
      jsonController.overwrite(parsed);
    }
  },

  //Returns a boolean for whether a given route is stored under a given method in JSON file
  containsRoute: (method, route) => {
    const parsed = jsonController.getAndParse();
    return parsed.routes[method].includes(route) || parsed.routes.ALL.includes(route);
  },

  //Overwrites existing JSON file or creates a new one with a new JSON object
  overwrite: (obj) => {
    fs.writeFileSync(path.join(__dirname, './../watchDog.json'), JSON.stringify(obj, null, '  '));
  },

  //sets json at path to val
  // path is an array
  update: (path, val) => {
    const parsed = jsonController.getAndParse();
    let curr = parsed;
    eval('parsed["'+path.join('"]["')+'"] = val');
    jsonController.overwrite(parsed);
  }

}

module.exports = jsonController;

jsonController.createJSON();
