const request = require('request');
//const request = require('supertest'); 
//const app = require('../test-servers/server-request-listener.js');
const express = require('express');
const config = require('../watchDog.config.js');
const path  = require("path");
const testRoutes = config["testRoutes"]

request("http://localhost:3000/")

for(let i = 0; i < testRoutes.length; i++){
   let route = 'http://localhost:3000'+ (testRoutes[i]["route"]);
   request(route); 
}
