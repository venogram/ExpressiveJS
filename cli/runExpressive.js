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

// warning messages
const useDefaultsWarn = 'useDefaults is set to false. Unspecified options may lead to errors in executing tests. We recommend you set this value to true.';
const entryWarn = 'No entry point specified in configuration file. Expressive will search for a file named server.js. If no matching file is found, Expressive will not work.';
const hostWarn = 'No host specified in the configuration file. Expressive will send requests to localhost://3000. If the server is running on a different port, Expressive will not work.';
const testRoutesWarn = 'No testRoutes specified. Expressive will send a get request to the home route. If you\'d like to test other routes, please create a testRoutes option in your config file. See github.com/venogram/ExpressiveJS for details.';
const watchWarn = 'No ';
const wipeCookiesWarn = 'wipeCookies option not specified. By default, Expressive will not wipe cookies between each test.';
//const overwriteTestWarn;
const silentServerWarn = 'No silentServer option specified. By default, your server\'s stdout will be piped to current processes stdout';
const abandonReqWarn = 'No abandonReq property found in expressive.config.js. Please define abandonReq or set useDefaults to true. Otherwise expressive testing will stall if the server fails to respond to a request.'

// default and user config files
const defaultConfig = require('./../default.config.js');
const cwd = process.cwd();
const userConfig = getConfig(cwd);
// combined default and user config files
let config;
if (userConfig && userConfig.useDefaults === false) {
  config = userConfig;
  process.emitWarning(useDefaulsWarn);
}
else if (userConfig) config = Object.assign(defaultConfig, userConfig);
else config = defaultConfig;

// get config settings
const entry = config.entry;
const serverPath = path.join(__dirname, './../', entry);
const host = config.host;
const testRoutes = config.testRoutes;
const abandonReq = config.abandonRequest;

let silentServer;
if (config.silentServer) silentServer = config.silentServer
else {
  silentServer = false;
  process.emitWarning(silentServerWarn);
}
if (!abandonReq) process.emitWarning(abandonReqWarn);


//initialize json file
jsonController.createJSON();

// start server as a child_process
const serv = fork(serverPath, {
  env: {ABANDON_REQ: abandonReq},
  silent: silentServer
});

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

// finds user config file via breadth first search -- returns null if it doesn't exist
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
