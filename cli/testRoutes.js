const request = require('request');
const express = require('express');
const config = require('../watchDog.config.js');
const path  = require("path");
const testRoutes = config["testRoutes"]

//SUPERTEST WITHOUT TESTING LIBRARIES 
// const request = require('supertest');
// const express = require('express');
// const app = express();
request("http://localhost:3000/")

for(let i = 0; i < testRoutes.length; i++){
   let route = 'http://localhost:3000'+ (testRoutes[i]["route"]);
   console.log(route)
   request(route); 
}



// request(app)
//   .get('/user')
//   .expect('Content-Type', /json/)
//   .expect('Content-Length', '15')
//   .expect(200)
//   .end(function(err, res) {
//     if (err) throw err;
//   });
// function testAllRoutes() {
//   for (let i = 0; i < testRoutes.length; i++) {
//     createRouteTests(testRoutes[i]["method"], testRoutes[i]["route"], testRoutes[i]["body"]) 
//   }
// }
// testAllRoutes();

// function createRouteTests(method, route, body){
//   request(app).method("'" + route + "'"); 
// }