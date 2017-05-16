const express = require('./../expressive.js');
//const express = require('express');
const request = require('request');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res, next) => {
  res.cookie('cookie1', 'hello world');
  return next();
}, (req, res, next) => {
  res.locals.newprop = 'string prop!!';
  setTimeout(() => {res.redirect('/redirect')}, 10);
});
//
app.get('/redirect', (req, res) => {
    res.send('hi');
})

app.post('/', (req, res) => {
  let body = '';
  req.on('data', data => {body += data});
  req.on('end', () => {
    res.send('server response to post request');
  });
});

app.get('/route1', (req, res) => {
  res.send('route 1 says hello');
});

app.get('/route2', (req, res) => {
  res.send('route 2 says hello');
});

app.get('/route3', (req, res) => {
  res.send('route 3 says hello');
});

app.listen(3000, () => {

});
