const request = require('supertest');
const path = require('path');
// const express = require('./../expressive.js');
const express = require('express')
const app = express(); 

describe('Get/', function(){
  it('respond with json', function(done){
    request (app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
      done();
  });
});