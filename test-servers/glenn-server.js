const express = require('express');
const Expressive = require('./../expressive.js');
const path = require('path');
const app = Expressive();
const blog = Expressive();
const router = Expressive.Router()

console.log('hello from glenn server');

const server = app.listen(3000, () => {
  console.log('Listening on port 3000\n');
})


app.get('/hello', router);

router.get('/hi', (req, res) => {
  res.send('how are you?')
})