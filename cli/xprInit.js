#!/usr/bin/env node

const path = require('path');
const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const cwd = process.cwd();
const cwdArr = cwd.split('/');
const lastDir = cwdArr[cwdArr.length - 1] + '/';

const terminal = rl.output;

const configObj = {};

function shortenStr(str) {
  return str.replace(/"|'|\s|\t/g, '');
}


function start() {
  rl.question('\nThis utility will walk you through creating an expressive.config.js file.' +
    '\nSee the Expressive documentation for more details: https://github.com/venogram/ExpressiveJS/#readme' +
    '\nPress Enter to accept defaults when provided.  Press ^C at any time to abort this process.' +
    '\n\nPress Enter to proceed', proceed => {
      defineEntry();
    });
}


function defineEntry() {
  const fallbackEntry = './server.js';
  rl.question(`\nWhere is your server file?\nRelative Path from ${lastDir}: (${fallbackEntry}) `, entry => {
    let shortEntry = shortenStr(entry) || fallbackEntry;
    if (fs.existsSync(path.join(cwd, shortEntry))) {
      configObj.entry = shortEntry;
      defineHost();
    } else {
      const fallbackAnswer = 'y';
      rl.question(`No file found at ${shortEntry}  Would you like to try a different path - y/n? (${fallbackAnswer}) `, answer => {
        let shortAnswer = shortenStr(answer) || fallbackAnswer;
        if (shortAnswer.charAt(0).toLowerCase() === 'y') return defineEntry();
        configObj.entry = shortEntry;
        defineHost();
      });
    }
  })
}


function defineHost() {
  const fallbackHost = 'http://localhost:3000';
  rl.question(`\nWhat is your server network host?\nHost: (${fallbackHost}) `, host => {
    let shortHost = shortenStr(host) || fallbackHost;
    if (shortHost.indexOf('http://') && shortHost.indexOf('https://')) shortHost = 'http://' + shortHost;
    if (shortHost.charAt(shortHost.length - 1) === '/') shortHost = shortHost.substring(0, shortHost.length - 1);
    configObj.host = shortHost;
    defineRequests();
  })
}

function defineRequests() {
  console.log('\nNext, specify the HTTP request(s) to send to your server.');
  configObj.requests = [];
  createRequest();
}

function createRequest() {
  defineMethod({});
}

function defineMethod(req) {
  const fallbackMethod = 'GET';
  rl.question(`\nHTTP request method: (${fallbackMethod}) `, method => {
    const shortMethod = shortenStr(method).toUpperCase() || fallbackMethod;
    req.method = shortMethod;
    defineRoute(req);
  })
}

function defineRoute(req) {
  const fallbackRoute = '/';
  rl.question(`HTTP ${req.method} request route: (${fallbackRoute}) `, uri => {
    let shortRoute = shortenStr(uri) || fallbackRoute;
    if (shortRoute.charAt(0) !== '/') shortRoute = '/' + shortRoute;
    req.route = shortRoute;
    bodyCheck(req);
  })
}

function bodyCheck(req) {
  //checks if request method calls for a body
  //if it does calls defineBody()
  //if it doesn't, add it to the reqsArr, then ask about any more requests.
  addRequest(req);
}

function addRequest(req) {
  configObj.requests.push(req);
  moreRequests(req);
}


function moreRequests(req) {
  const fallbackAnswer = 'y';
  rl.question(`Registered an HTTP ${req.method.toUpperCase()} request to ${configObj.host + req.route}` +
    `\n\nWould you like to send more requests - y/n? (${fallbackAnswer}) `, answer => {
      let shortAnswer = shortenStr(answer).toLowerCase() || fallbackAnswer;
      if (shortAnswer.toLowerCase().charAt(0) === 'y') createRequest();
      else createConfigFile();
    })
}


function createConfigFile() {
  const config = `module.exports = ${JSON.stringify(configObj, null, '  ')}`;
  fs.writeFile('expressive.config.js', config, () => {
    console.log(`\nCreating expressive.config.js file.\n\n`);
    rl.close();
  });
}


start();
