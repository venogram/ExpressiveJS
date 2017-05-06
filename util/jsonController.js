/*
  contains methods that retrieve and/or alter the json file


*/


const fs = require('fs');
const path = require('path');

const jsonController = {

  //Returns parsed JSON file
  getAndParse: () => {
    const json = fs.readFileSync(path.join(__dirname, './../expressive.json'));
    return JSON.parse(json);
  },

  //Creates skeleton JSON file
  createJSON: () => {
    const skeleton = {
      routes: {},
      completedReqs: 0
    };
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
    return (parsed.routes[method] && parsed.routes[method].includes(route)) || parsed.routes.all && parsed.routes.all.includes(route);
  },

  //Overwrites existing JSON file or creates a new one with a new JSON object
  overwrite: (obj) => {
    fs.writeFileSync(path.join(__dirname, './../expressive.json'), JSON.stringify(obj, null, '  '));
  },

  //removes keys in json object not useful to developer nor for visualization.
  scrub: (obj) => {
    delete obj.currentRoute;
    jsonController.overwrite(obj);
  },

  //follows linked list of reports to find current report, then passes it to the callback function
  updateCurrentReport: (parsed, callback) => {
    let curr = parsed[parsed.currentRoute];
    while (curr.next) curr = curr.next;
    return callback(curr);
  }

}

module.exports = jsonController;
