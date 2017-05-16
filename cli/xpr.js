#!/usr/bin/env node

/*
  command line script that runs expressive tests, then bundles the front end, and
  then opens electron to display the html
*/

const exec = require('child_process').exec;
const ProgressBar = require('progress');

const argument = process.argv[2];
if (argument === 'test') exec('xpr-test');
else if (argument === 'build') exec('xpr-build');
else if (argument === 'display') exec('xpr-display');
else if (argument === 'init') exec('xpr-init');
else {

  const bar = new ProgressBar(' expressive [:bar] :step', {
    complete: '#',
    incomplete: ' ',
    total: 2
  });



  exec('xpr-test', () => {
    exec('xpr-build', () => {
      exec('xpr-display');
    })
  });

}
