const express = require('express');
const WatchDog = require('./../watchDog.js');

const app = express();

app.get('/', (req, res) => {
  req.on('response', () => {console.log('req emitted response event')});
  res.end('Server has ended response -- check server log!');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
})
