const express = require('./../expressive.js');
//const express = require('express');
const request = require('request');
const path = require('path');

const app = express();



app.get('/', (req, res, next) => {
  res.cookie('cookie1', 'hello world');
  return next();
}, (req, res, next) => {
  setTimeout(() => {res.redirect('/redirect')}, 3100)
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

})

app.listen(3000, () => {
  console.log('Listening on port 3000');
}).on('request', (req, res) => {
  setTimeout(() => {
    process.send('abandonReq');
    res.end();
    process.send('next');
  }, 3000)
});
