#!/usr/bin/env node

/*
  command line script that runs expressive tests, then bundles the front end, and
  then opens electron to display the html
*/

const exec = require('child_process').exec;

exec('xpr-test', () => {
  exec('xpr-build', () => {
    exec('xpr-display');
  })
});
