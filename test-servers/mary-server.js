const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
//app.use(cookieParser);
app.listen(3000)
app.get('/', function(req, res) {
  res.status(200).json({ name: 'VENOGRAM' });
});

app.get('/redirect', function(req, res){
  res.redirect('/redirect2');
})

app.get('/redirect2', function(req, res){
  res.status(200).json({ methodRoute: 'Mary' });
})


// const express = require('express');
// //const express = require('express');
// const request = require('request');
// const path = require('path');
// const app = express();
// const logger = require('morgan');
// app.use(logger('dev'));









module.exports = app;