const express = require('express');
const WatchDog = require('./../watchDog.js');

const app = WatchDog();

app.get('/', (req, res, next) => {
  console.log('MADE IT TO APP.GET');
  res.cookie('cookie1', 'hello world');
  console.log('middleware 1');
  return next();
}, (req, res, next) => {
  res.send('response sent!');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
})
