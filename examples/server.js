const express = require('./getwrapper.js');
console.log('============TYPEOF EXPRESS()==========', typeof express());
//const express = require('express');
const path = require('path');
const app = express();
const EventEmitter = require('events');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});

myEmitter.emit('event');


myEmitter.addListener('get', (req, res) => {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", req.body)
})

app.get('/data', (req, res, next)=>{
    return next();
}, (req, res)=>{
    res.send('hi');
})

// app.get('/', (req, res, next) => {
//   res.sendFile(path.join(__dirname, './index.html'));
// })

// app.get('/redirect', (req, res, next) => {
//   myEmitter.emit('get', req, res);
//   res.redirect(301, '/secondRedirect')
// })

// app.get('/secondRedirect', (req, res) => {
//   myEmitter.emit('event')
//   res.redirect(301, '/');
// })

app.listen(3000, () => {
  console.log('Listening on port 3000');
})