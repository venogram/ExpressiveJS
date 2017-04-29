#!/usr/bin/env node

//File that opens the Electron Application 

const exec = require('child_process').exec;
const path = require('path');
const guiHTML = path.join(__dirname, "../node_modules/.bin/electron");

exec(`${guiHTML} .`, () => {

})
