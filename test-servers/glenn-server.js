const express = require('express');
const WatchDog = require('./../watchDog.js');
const path = require('path');
const app = WatchDog();
// const app = express();

console.log('hello from glenn server');

// app.get('/', (req, res, next) => {
//   console.log('======GET /=====');
//   res.cookie('cookie1', 'hello world');
//   return next();
// }, (req, res, next) => {
//   res.send('response sent!');
// });

function addCookie(req, res, next) {
  console.log('mmm cookies...');
  res.cookie('cookies', 'are tasty');
  // console.log('originalUrl', req.originalUrl);
  return next();
}

app.use('/', addCookie);
// app.use('/', (req, res, next) => {
//   console.log('firing app.use("/")');
//   return next();
// });


app.get('/', (req, res) => {
  console.log('getting /\n');
  res.redirect('/route1');
})

app.get('/route1', (req, res) => {
  console.log('getting /route1\n');
  // console.log('route 1 req.url:', req.url, '\n');
  res.redirect('/route2');
})

app.get('/route2', (req, res) => {
  console.log('getting /route2\n');
  res.sendFile(path.resolve(__dirname + '/../testHtml/destination.html'));
})

const server = app.listen(3000, () => {
  console.log('Listening on port 3000\n');
})