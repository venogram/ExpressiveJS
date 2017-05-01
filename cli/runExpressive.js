#!/usr/bin/env node

/*
  Command line script to run the devServer and fire requests at it

  1. start devServer
    -> CHECK!
  2. fire requests at provided testRoutes
    -> do we have to wait for one to complete to start the next?

  TODO: right now we only fire get requests
*/

const request = require('request');
const path = require('path');
const jsonController = require('./../util/jsonController.js');
const config = require('./../expressive.config.js');
const fork = require('child_process').fork;

const entry = config.entry;
const serverPath = path.join(__dirname, './../', entry);
const host = config.host;
const testRoutes = config.testRoutes;

//initialize json file
jsonController.createJSON();

//starts server as a child_process
const serv = fork(serverPath);

const reqRoutes = testRoutes
  .filter(routeInfo => routeInfo.method === 'GET')
  .map(routeInfo => routeInfo.route);

const numOfReqs = reqRoutes.length;
let completedReqs = 0;

serv.on('message', (message) => {
  if (message === 'listening') {
    // FIRE First Request!
    request(host + reqRoutes[0]);
    completedReqs += 1;
  } else if (message === 'next' && completedReqs < numOfReqs) {
    //A request finished -- fire the next request if necessary!
    request(host + reqRoutes[completedReqs]);
    completedReqs += 1;
  } else if (message === 'next') {
    const json = jsonController.getAndParse();
    jsonController.scrub(json);
    serv.kill('SIGINT');
  }
});
