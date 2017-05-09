const usingExpressive = true;

var express = usingExpressive ? require('./../expressive.js') : require('express');
var app = express();


var router = express.Router();


app.use('/api', router);

router.route('/').get(function jsonMidware(req,res, next){
  res.locals._ryan = 'isdumb';
  return next();
}, function mw2(req, res) {
  res.send('success!')
});


// app.get('/', (req, res, next) => {
//   console.log('midware 1 hit!');
//   return next();
// }, (req, res) => {
//   console.log('midware 2 hit!');
//   res.send('yippee!');
// })


app.listen(3000,function(){
  console.log("Live at Port 3000");
});
