#!/usr/bin/env node

//Runs Webpack to Update Visualization on Changes
const ProgressBar = require('progress');
const spawn = require('child_process').spawn;
const path = require('path');
const fs = require('fs');
const getConfig = require('./getConfig');
const guiPath = path.join(__dirname, "../gui");

let {userConfig, configPath} = getConfig(process.cwd());

console.log(configPath);

let xpr;

if (userConfig && configPath) {
  let jsonPath = path.join(configPath, '..', userConfig.outputDir, 'expressive.json');
  if (fs.existsSync(jsonPath)) xpr = require(jsonPath);
  console.log('jsonPath:', jsonPath);
} else {
  let defaultPath = path.join(process.cwd(), 'expressive.json');
  if (fs.existsSync(defaultPath)) xpr = require(defaultPath);
  else throw new Error('couldn\'t find expressive.json. Please run xpr init');
}

const restingPath = path.join(__dirname, './../gui/expressive.json');
fs.writeFileSync(restingPath, JSON.stringify(xpr, null, '  '));

// const bar = new ProgressBar(' webpack bundling [:bar]', {
//   complete: '=',
//   incomplete: ' ',
//   total: 2
// });
//
// bar.tick();



console.log('Bundling graphic user interface...');
spawn(`webpack`, {
  cwd: guiPath
});
