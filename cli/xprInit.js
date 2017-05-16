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

function shortenStr(str) {
  return str.replace(/"|'|\s|\t/g, '');
}

const configObj = {
  outputDir: '/'
};

start();


function start() {
  rl.question('\nThis utility will walk you through the basics creating an expressive.config.js file.' +
    '\nPress Enter to accept provided defaults.  Press ^C at any time to abort this process.' +
    '\n\nPress Enter to proceed', proceed => {
      return defineEntry();
    });
}


function defineEntry(firstTry = true) {
  const fallbackEntry = './server.js';
  if (firstTry) console.log('\nWhere is your server file?')
  rl.question(`Relative Path from ${lastDir}: (${fallbackEntry}) `, entry => {
    let shortEntry = shortenStr(entry) || fallbackEntry;
    if (fs.existsSync(path.join(cwd, shortEntry))) {
      configObj.entry = shortEntry;
      return defineHost();
    } else {
      const fallbackAnswer = 'y';
      rl.question(`No file found at ${shortEntry}  Would you like to try a different path - y/n? (${fallbackAnswer}) `, answer => {
        let shortAnswer = shortenStr(answer) || fallbackAnswer;
        if (shortAnswer.charAt(0).toLowerCase() === 'y') return defineEntry(false);
        configObj.entry = shortEntry;
        return defineHost();
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
    return defineRequests();
  })
}

function defineRequests() {
  configObj.requests = [];
  return createRequest();
}

function createRequest() {
  return defineMethod({});
}

function defineMethod(req) {
  const fallbackMethod = 'GET';
  if (!configObj.requests.length) console.log('\nNext, specify the HTTP request(s) to send to your server.');
  rl.question(`HTTP request method: (${fallbackMethod}) `, method => {
    const shortMethod = shortenStr(method).toUpperCase() || fallbackMethod;
    req.method = shortMethod;
    return defineRoute(req);
  })
}

function defineRoute(req) {
  const fallbackRoute = '/';
  rl.question(`HTTP request route: (${fallbackRoute}) `, uri => {
    let shortRoute = shortenStr(uri) || fallbackRoute;
    if (shortRoute.charAt(0) !== '/') shortRoute = '/' + shortRoute;
    req.route = shortRoute;
    return addRequest(req);
  })
}


function addRequest(req) {
  configObj.requests.push(req);
  moreRequests(req);
}


function moreRequests(req) {
  const fallbackAnswer = 'y';
  rl.question(`Registered an HTTP ${req.method.toUpperCase()} request to ${configObj.host + req.route}` +
    `\n\nTotal Requests: ${configObj.requests.length}.  Would you like to send more requests - y/n? (${fallbackAnswer}) `, answer => {
      let shortAnswer = shortenStr(answer).toLowerCase() || fallbackAnswer;
      if (shortAnswer.charAt(0) === 'y') createRequest();
      else createConfigFile();
    })
}


function createConfigFile() {
  const config = `module.exports = ${JSON.stringify(configObj, null, '  ')}`;
  fs.writeFile('expressive.config.js', config, () => {
    rl.close();
    console.log(`\nAn expressive.config.js file has been created in this directory (${lastDir})`);
    console.log('Consult the Expressive documentation for further request specifications:\n' +
     'https://github.com/venogram/ExpressiveJS/#readme \n\n');
  });
}

