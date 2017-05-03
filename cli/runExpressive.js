#!/usr/bin/env node

/*
  Command line script to run the devServer and fire requests at it

  1. start devServer
    -> CHECK!
  2. fire requests at provided testRoutes
    -> do we have to wait for one to complete to start the next?

  TODO: right now we only fire get requests
  TODO: build final form of config object
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

testRoutes.forEach(options => {
  options.uri = host + options.uri;
});
const numOfReqs = testRoutes.length;
let completedReqs = 0;

serv.on('message', (message) => {
  if (message === 'listening') {
    // FIRE First Request!
    console.log('first route options:', testRoutes[0])
    request(testRoutes[0]);
    completedReqs += 1;
  } else if (message === 'next' && completedReqs < numOfReqs) {
    //A request finished -- fire the next request if necessary!
    const json = jsonController.getAndParse();
    jsonController.scrub(json);
    request(testRoutes[completedReqs]);
    completedReqs += 1;
  } else if (message === 'next') {
    const json = jsonController.getAndParse();
    jsonController.scrub(json);
    serv.kill('SIGINT');
  }
});
