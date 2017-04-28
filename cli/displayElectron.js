#!/usr/bin/env node

const exec = require('child_process').exec;
const path = require('path'); 
const guiHTML = path.join(__dirname, "../gui/report/public/index.html"); 
exec(`open ${guiHTML}`)
