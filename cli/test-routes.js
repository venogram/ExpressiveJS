#!/usr/bin/env node

/*
  command line script that runs expressive tests, then bundles the front end, and
  then opens electron to display the html
*/

const Promise = require('bluebird');
const exec = require('child_process').exec;

const runExpressive = new Promise((resolve, reject) => {
  exec("wd", (err) => {
    if (err) reject(err);
    else resolve();
  });
});

runExpressive
  .then(() => {
    exec("build")
  })
  .then(() => {
    exec("display");
  })
  .catch(() => {
    console.log('there was an error in the promise chain');
  });
