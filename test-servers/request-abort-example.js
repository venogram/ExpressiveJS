const express = require('express');
const WatchDog = require('./../watchDog.js');
const path = require('path');
const app = WatchDog();

app.get('/', (req, res, next) => {
  res.cookie('cookie1', 'hello world');
  return next();
}, (req, res, next) => {
  res.send('response sent!');
});

app.put('/', (req, res) => {
  console.log('gettin dat route route');
  res.sendFile(path.resolve(__dirname + '/../testHtml/destination.html'));
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})
