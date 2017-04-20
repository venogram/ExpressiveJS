const express = require('express');
const path = require('path');
const app = express();
const EventEmitter = require('events')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
class MyEmitter extends EventEmitter { }
const http = require('./getwrapper.js')

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});

myEmitter.emit('event');


myEmitter.addListener('get', (req, res) => {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", req.body)
})


app.get('/data', (req, res, next)=>{
  http.get('http://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Kitten_in_Rizal_Park%2C_Manila.jpg/230px-Kitten_in_Rizal_Park%2C_Manila.jpg', (response) =>{
    res.end("hello");
  });
})

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, './index.html'));
})

app.get('/redirect', (req, res, next) => {
  myEmitter.emit('get', req, res);
  res.redirect(301, '/secondRedirect')
})

app.get('/secondRedirect', (req, res) => {
  myEmitter.emit('event')
  res.redirect(301, '/');
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})