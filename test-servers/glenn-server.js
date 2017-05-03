const express = require('express');
const Expressive = require('./../expressive.js');
const path = require('path');
const app = Expressive();
// const app = express();

console.log('hello from glenn server');

const server = app.listen(3000, () => {
  console.log('Listening on port 3000\n');
})

app.get('/', function midware1(req, res, next) {
  console.log('request hit developer midware 1');
  return next();
}, function midware2(req, res, next) {
  console.log('request hit develoer midware 2');
  return next();
}, function midware3(req, res) {
  console.log('request hit developer midware 3');
  res.redirect('/fakeRoute');
});

app.get('/redirect', function midware4(req, res) {
  console.log('request hit developer midware 4');
  res.send('yipee');
})

