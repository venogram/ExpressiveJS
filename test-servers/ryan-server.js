const express = require('./../expressive.js');
//const express = require('express');
const request = require('request');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.cookie('cookie1', 'hello world');
  return next();
}, (req, res, next) => {
  setTimeout(() => {res.redirect('/redirect')}, 8000);
});
//
app.get('/redirect', (req, res) => {
  console.log('========/REDIRECT=======');
  setTimeout(() => {res.send('hi')}, 800);
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
