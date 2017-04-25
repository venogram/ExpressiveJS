const express = require('express');
const WatchDog = require('./../watchDog.js');

const app = WatchDog();

app.get('/', (req, res) => {
  console.log('MADE IT TO APP.GET');
  res.send('hi');
  console.log('hiya');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
})
