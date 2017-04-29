#!/usr/bin/env node

//Runs Webpack to Update Visualization on Changesß

const exec = require('child_process').exec;
const path = require('path'); 
const guiPath = path.join(__dirname, "../gui"); 
exec(`cd ${guiPath} && webpack`, (err, stdout, stderr) =>{

})
