const express = require('express');
const Expressive = require('./../expressive.js');
const path = require('path');
const app = Expressive();
// const app = express();

console.log('hello from glenn server');

app.get('/', (req, res) => {
  res.redirect('/fakeRoute');
})

const server = app.listen(3000, () => {
  console.log('Listening on port 3000\n');
})