const express = require('express');
const initTracking = require('./../util/initTracking.js');

const app = express();

app.get('/', initTracking);

app.listen(3000, () => {console.log('Listening on port 3000')});
