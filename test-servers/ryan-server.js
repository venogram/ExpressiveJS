const express = require('./../expressive.js');
const path = require('path');


const app = express();

app.get('/', (req, res, next) => {
  res.cookie('cookie1', 'hello world');
  return next();
}, (req, res, next) => {
  res.redirect('/redirect');
});
//
app.get('/redirect', (req, res) => {
  res.send('hi');
})
//
// app.get('/route', (req, res) => {
//   console.log('===========/ROUTE========');
//   res.sendFile(path.resolve(__dirname + '/../testHtml/destination.html'));
// })
//
app.listen(3000, () => {
  console.log('Listening on port 3000');
})
