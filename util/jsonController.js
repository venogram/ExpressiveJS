/*
TODO: test all methods in this file


*/


const fs = require('fs');

module.exports = {

  //Returns parsed JSON file
  getAndParse: () => {
    const json = fs.readFileSync('./../watchDog.json'),
    return JSON.parse(json);   
  },

  //Creates skeleton JSON file
  createJSON: () => {
    const skeleton = {
        routes: { get: [], post: [], put: [], delete: [] }
      }
    this.overwrite(skeleton);
  },

  //Stores a route and request method that the server is listening for
  addRoute: (method, route) => {
    const parsed = this.getAndParse();
    parsed.routes[method].push(route);
    this.overwrite(parsed);
  },

  //Returns a boolean for whether a given route is stored under a given method in JSON file
  containsRoute: (method, route) => {
    const parsed = this.getAndParse();
    return parsed.routes[method].includes(route);
  },

  //Overwrites existing JSON file or creates a new one with a new JSON object
  overwrite: (obj) => {
    fs.writeFileSync('./../watchDog.json', JSON.stringify(obj));
  },

  // Updates a value for a key in the JSON file found with provided path
  update: (path, val) => {
    const parsed = this.getAndParse();
    let curr = parsed;
    path.map((step) => curr = curr[step] );
    curr = val;
    this.overwrite(parsed);
  }

}