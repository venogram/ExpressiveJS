#!/usr/bin/env node

/*
  Command line script to run the devServer and fires requests at it

  1. start devServer
    -> CHECK!
  2. fire requests at provided routes
    -> do we have to wait for one to complete to start the next?

  TODO: build final form of config object
*/

// dependencies
const request = require('request');
const path = require('path');
const fs = require('fs');
const jsonController = require('./../util/jsonController.js');
const fork = require('child_process').fork;
const ProgressBar = require('progress');


// default and user config files

const defaultConfig = require('./../default.config.js');
const cwd = process.cwd();

const { userConfig, configPath } = getConfig(cwd);

// combined default and user config files
let config = Object.assign({}, defaultConfig, userConfig);

// get config settings
let entry = config.entry;
let serverPath;
if (userConfig) {
  serverPath = path.join(configPath, '/..', entry);
} else {
  serverPath = path.join(cwd, entry);
}

if (!fs.existsSync(serverPath)) throw new Error('Invalid server path.  Edit expressive.config.js entry')
const host = config.host;
const requests = config.requests;
const abandonReq = config.abandonRequest;
const silentServer = config.silentServer;
const wipeCookies = config.wipeCookies;
const outputDir = userConfig ? path.join(configPath, '..', config.outputDir) : process.cwd();

process.env.OUTPUT_DIR = outputDir;

// set uri's for sending requests and set wipeCookies
requests.forEach(options => {
  options.method = options.method.toUpperCase();
  options.uri = host.charAt(host.length - 1) === '/' ? host.substring(0, host.length - 1) + options.route : host + options.route;
  delete options.route;
  options.jar = !wipeCookies;
});
// number of requests xpr must send
const numOfReqs = requests.length;
// number of requests already sent
let completedReqs = 0;

const bar = new ProgressBar(' expressive (:bar) processing request :completedReqs of :numOfReqs', {
  complete: '##',
  incomplete: '  ',
  total: numOfReqs
});

const forkOptions = {
  env: {
    ABANDON_REQ: abandonReq,
    OUTPUT_DIR: outputDir
  },
  silent: silentServer
}

let heardListening = false;

function msgCallback(message) {
  if (message === 'listening') {
    if (!heardListening) heardListening = true;
    if (completedReqs < numOfReqs) {
      bar.tick({
        completedReqs: completedReqs + 1,
        numOfReqs
      });
      request(requests[completedReqs]).on('error', (e) => {console.log('caught the error')});
    }
    else {
      serv.kill('SIGINT');
    }
  } else if (message === 'next') {
    completedReqs += 1;
    if (completedReqs < numOfReqs) {
      bar.tick({
        completedReqs: completedReqs + 1,
        numOfReqs
      })
      request(requests[completedReqs]).on('error', (e) => {console.log('caught the error')});
    }
    else {
      serv.kill('SIGINT');
    }
  } else if (message === 'abandonReq') {
    completedReqs += 1;
    serv.kill('SIGINT');
  }
}

function exitCallback(code) {
  if (!heardListening) throw new Error("Can't start server.");
  if (completedReqs < numOfReqs) {
    serv = fork(serverPath, forkOptions)
      .on('message', msgCallback)
      .on('exit', exitCallback)
      .on('error', errorCallback);
  } else {
    jsonController.delCurrInf();
  }
}

function errorCallback(err) {
  console.log('caught server error:', err);
}


//initialize json file
jsonController.createJSON();

// start server as a child_process
let serv = fork(serverPath, forkOptions)
    .on('message', msgCallback)
    .on('exit', exitCallback)
    .on('error', errorCallback);

// finds user config file via breadth first search -- returns null if it doesn't exist
function getConfig(directory, dirQueue = []) {
  const allFiles = fs.readdirSync(directory);
  const files = [];
  allFiles.forEach(fileName => {
    const absPath = path.join(directory, fileName);
    fs.lstatSync(absPath).isDirectory() ? dirQueue.push(absPath) : files.push(absPath);
  });
  let userConfig = null;
  let configPath = null;
  files.forEach(path => {
    if (path.slice(-20) === 'expressive.config.js') {
      configPath = path;
      userConfig = require(path);
    }
  });
  if (!dirQueue.length || userConfig) {
    return { userConfig, configPath };
  }

  const nextDir = dirQueue.shift();
  return getConfig(nextDir, dirQueue);
}
