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
const json = require('./../watchDog.json');
const config = require('./../watchDog.config.js');
const entry = config.entry;
const host = config.host;
const testRoutes = config.testRoutes;
const fork = require('child_process').fork;
const serverPath = path.join(__dirname, './../', entry);

//initialize json file
jsonController.createJSON();

//starts server as a child_process
const serv = fork(serverPath);

serv.on('message', (message) => {
  if (message = 'listening') {
    // FIRE REQUESTS!
    request(host+'/');
  }
})



//serv.kill('SIGINT');
