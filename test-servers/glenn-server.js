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
  return next();
}

// app.use('/route', addCookie);

app.get('/', (req, res) => {
  console.log('getting /');
  res.redirect('/route');
})

app.get('/route', addCookie, (req, res) => {
  console.log('getting /route');
  // console.log('redirect Count:', res.locals._WD.redirectCount);
  res.sendFile(path.resolve(__dirname + '/../testHtml/destination.html'));
})

const server = app.listen(3000, () => {
  console.log('Listening on port 3000');
})