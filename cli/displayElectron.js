#!/usr/bin/env node

const exec = require('child_process').exec;
const path = require('path');
const guiHTML = path.join(__dirname, "../node_modules/.bin/electron");

//console.log(__dirname)

exec(`${guiHTML} .`, () => {
    //console.log(guiHTML)
})
