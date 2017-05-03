#!/usr/bin/env node

/*
  Command line script to run the devServer and fires requests at it

  1. start devServer
    -> CHECK!
  2. fire requests at provided testRoutes
    -> do we have to wait for one to complete to start the next?

  TODO: build final form of config object
*/

// dependencies
const request = require('request');
const path = require('path');
const fs = require('fs');
const jsonController = require('./../util/jsonController.js');
const fork = require('child_process').fork;

// default and user config files
const defaultConfig = require('./../default.config.js');
const cwd = process.cwd();
const userConfig = getConfig(cwd);
// combined default and user config files
let config;
if (userConfig && userConfig.useDefaults === false) config = userConfig;
else if (userConfig) config = Object.assign(defaultConfig, userConfig);
else config = defaultConfig;
// info for sending requests
const entry = config.entry;
const serverPath = path.join(__dirname, './../', entry);
const host = config.host;
const testRoutes = config.testRoutes;

//initialize json file
jsonController.createJSON();

// start server as a child_process
const serv = fork(serverPath);

// set uri's for sending requests
testRoutes.forEach(options => {
  options.uri = host + options.uri;
});
// number of requests xpr must send
const numOfReqs = testRoutes.length;
// number of requests already sent
let completedReqs = 0;

serv.on('message', (message) => {
  if (message === 'listening') {
    // dev server sends 'listening' when app.listen has been called
    // FIRE First Request!
    request(testRoutes[0]);
    completedReqs += 1;
  } else if (message === 'next' && completedReqs < numOfReqs) {
    // dev server sends 'next' when it has finished a response without redirecting
    // A request finished -- fire the next request if necessary!
    const json = jsonController.getAndParse();
    jsonController.scrub(json);
    request(testRoutes[completedReqs]);
    completedReqs += 1;
  } else if (message === 'next') {
    const json = jsonController.getAndParse();
    jsonController.scrub(json);
    serv.kill('SIGINT');
  } else if (message === 'abandonReq') {
    console.log('request abandoned - surpassed abandonReq time limit');
  }
});

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
