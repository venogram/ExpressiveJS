const express = require('express');
const Expressive = require('./../expressive.js');
const path = require('path');
const app = Expressive();
// const app = express();
const router = Expressive.Router()

console.log('hello from glenn server');

const server = app.listen(3000, () => {
  console.log('Listening on port 3000\n');
})
router.route('/').get(function midware1(req, res, next){res.send("yay")});
// app.route('/').get(function midware1(req, res, next){res.send("yay")})