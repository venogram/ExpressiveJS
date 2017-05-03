#!/usr/bin/env node

/*
  Command line script to run the devServer and fires requests at it

  1. start devServer
    -> CHECK!
  2. fire requests at provided testRoutes
    -> do we have to wait for one to complete to start the next?

  TODO: build final form of config object
*/

const request = require('request');
const path = require('path');
const fs = require('fs');
const jsonController = require('./../util/jsonController.js');
const fork = require('child_process').fork;
const config = require('./../expressive.config.js');
const entry = config.entry;
const serverPath = path.join(__dirname, './../', entry);
const host = config.host;
const testRoutes = config.testRoutes;

function getConfig(directory, dirQueue = []) {
  const allFiles = fs.readdirSync(directory);

  const files = [];
  allFiles.forEach(fileName => {
    const absPath = path.join(directory, fileName);
    fs.lstatSync(absPath).isDirectory() ? dirQueue.push(absPath) : files.push(absPath);
  });

  let config = null;
  files.forEach(path => {
    if (path.slice(-20) === 'expressive.config.js') config = require(path);
  });

  if (!dirQueue.length || config) return config;

  const nextDir = dirQueue.shift();
  return getConfig(nextDir, dirQueue);
}



//FIND CONFIG FILE
const cwd = process.cwd();
getConfig(cwd);

/*
cases:
  no config file
  config file specifies no defaults
  config file doesn't specify no defaults
*/


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
