#!/usr/bin/env node

/*
  Command line script to run the devServer and fire requests at it

  1. start devServer
    -> CHECK!
  2. fire requests at provided testRoutes
    -> do we have to wait for one to complete to start the next?

  TODO: right now we only fire get requests
*/

const request = require('request');
const Promise = require('bluebird');
const path = require('path');
const jsonController = require('./../util/jsonController.js');
//const json = require('./../watchDog.json');
const config = require('./../watchDog.config.js');
const fork = require('child_process').fork;

const entry = config.entry;
const serverPath = path.join(__dirname, './../', entry);
const host = config.host;
const testRoutes = config.testRoutes;

//initialize json file
jsonController.createJSON();

//starts server as a child_process
const serv = fork(serverPath);


serv.on('message', (message) => {
  if (message === 'listening') {
    // FIRE REQUESTS!
    const myReq = new Promise((resolve, reject) => {
      request('http://localhost:3000/', (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });

    myReq
      .then((res) => {
        console.log('request complete! Now I will kill the server.... mwahahah');
        serv.kill('SIGINT');
      })
  }
})


//serv.kill('SIGINT');
