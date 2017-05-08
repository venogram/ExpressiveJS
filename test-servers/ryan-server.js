const express = require('./../expressive.js');
//const express = require('express');
const request = require('request');
const path = require('path');

const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res, next) => {
  res.cookie('cookie1', 'hello world');
  res.send();
  // return next();
}, (req, res, next) => {
  setTimeout(() => {res.redirect('/redirect')}, 10);
});
//
app.get('/redirect', (req, res) => {
  console.log('========/REDIRECT=======');
  setTimeout(() => {
    console.log('==========SETTIMEOUT WAS CALLED==========');
    res.send('hi')
  }, 10);
})

app.post('/', (req, res) => {
  let body = '';
  req.on('data', data => {body += data});
  req.on('end', () => {
    res.send('server response to post request');
  });

})

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
