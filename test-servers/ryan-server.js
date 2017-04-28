const express = require('express');
const WatchDog = require('./../watchDog.js');
const path = require('path');
const app = express();

console.log('hi from ryan');

app.get('/', (req, res, next) => {
  console.log('======GET /=====');
  res.cookie('cookie1', 'hello world');
  res.redirect('/redirect');
  return next();
}, (req, res, next) => {
  res.send('response sent!');
});

app.get('/redirect', (req, res) => {
  console.log(res);
  res.send('you were redirected!');
})

app.get('/route', (req, res) => {
  console.log('gettin dat route route');
  res.sendFile(path.resolve(__dirname + '/../testHtml/destination.html'));
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})
