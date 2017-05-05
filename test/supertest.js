const request = require('supertest');
const path = require('path');
const express = require('./../expressive.js');
const app = express(); 
const expect = require ('expect')

describe('Get/', function(){
  it('respond with json', function(done){
    request (app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});