#!/usr/bin/env node

const path = require('path');
const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let cwd = process.cwd();

function getEntry(){
  return new Promise(resolve => {
    rl.question('Enter relative path (from cwd) to your server file: ', entry => {resolve(entry)});
  });
}

function getHost(entry) {
  return new Promise(resolve => {
    rl.question('Enter host (e.g. localhost:3000): ', host => {resolve({entry, host})});
  });
}

function createConfig(obj) {
  const configObj = Object.keys(obj).reduce((acc, key) => {
    if (obj[key]) acc[key] = obj[key];
    return acc;
  }, {});

  const config = `module.exports = ${JSON.stringify(configObj, null, '  ')}`;

  fs.writeFileSync('expressive.config.js', config);
}

getEntry().then(getHost).then(createConfig);
