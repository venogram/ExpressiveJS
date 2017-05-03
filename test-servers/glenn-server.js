const express = require('express');
const Expressive = require('./../expressive.js');
const path = require('path');
const app = Expressive();
// const app = express();

console.log('hello from glenn server');

app.get('/', function midware1(req, res) {
  res.redirect('/redirect');
})

app.get('/redirect', function midware2(req, res){
  res.send('yipee');
})

const server = app.listen(3000, () => {
  console.log('Listening on port 3000\n');
})