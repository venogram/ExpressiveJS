const express = require('express');
const path = require('path');
const app = express();
const supertest = require("supertest")

const listener = app.listen(3000, () => {
  console.log("Listening on PORT 3000");
});

app.use(express.static(path.join(__dirname, './../testHtml')))


app.get('/', (req, res) => {
  console.log("Making get request to  / ")
  res.sendFile(path.resolve(__dirname + '/../testHtml/listenerTest.html'));
})

app.get('/route', (req, res) => {
  console.log('gettin dat route route');
  res.sendFile(path.resolve(__dirname + '/../testHtml/destination.html'));
})

app.get('/close', () => {
  console.log("close dis servah")
  listener.close();
})

// listener.on('connect', (e,x) => console.log('connected!',e,x));

listener.on('request', (req, res) => {
  console.log("Path:", req.path);
})

// listener.on('finish', (e,x) => console.log("finished!",e,x));

// listener.on('close', (e,x) => console.log("closed!\n\n\n\n\n\n",e,'\n\n\n\n\n',x,'\n\n\n\n\n'));

// listener.on('checkContinue', (e,x) => console.log("checking continue...",e,x));





module.exports = app; 