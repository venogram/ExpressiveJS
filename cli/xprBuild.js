#!/usr/bin/env node

//Runs Webpack to Update Visualization on Changes
const ProgressBar = require('progress');
const exec = require('child_process').exec;
const path = require('path');
const guiPath = path.join(__dirname, "../gui");

// const bar = new ProgressBar(' webpack bundling [:bar]', {
//   complete: '=',
//   incomplete: ' ',
//   total: 2
// });
//
// bar.tick();

console.log('Bundling graphic user interface...');
exec(`cd ${guiPath} && webpack`, () => {
  // bar.tick();
});
