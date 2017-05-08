#!/usr/bin/env node

//File that opens the Electron Application

//const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const path = require('path');
const guiHTML = path.join(__dirname, "../node_modules/.bin/electron");
const expressiveDir = path.join(__dirname, "./..");

exec(`cd ${expressiveDir} && ${guiHTML} .`);

process.exit();
