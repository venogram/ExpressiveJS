const testing = true;

const express = require('express');
const expressive = require('./../expressive.js');
const path = require('path');
const app = testing ? expressive() : express();
const cookieParser = require('cookie-parser');

function addCookie(req, res, next) {
  // res.clearCookie('foo');
  res.cookie('foo', 'bar');
  return next();
}

app.use(cookieParser());

app.get('/', addCookie, (req, res) => {
  res.redirect('/cookieCheck');
})

app.get('/cookieCheck', (req, res) => {
  if (req.cookies && req.cookies.foo === 'bar'){
   res.send('You have a our cookie! :)');
  }
  else res.send('You do not have our cookie! :(')
})



app.listen(3000, () => {
  console.log('Listening on port 3000');
})