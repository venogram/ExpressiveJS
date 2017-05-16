const usingExpressive = true;

var express = usingExpressive ? require('./../expressive.js') : require('express');
var app = express();

// console.log(typeof app);
// console.log(app.handle.toString());
// console.log(app.toString());


app.post('/', (req, res) => {
  console.log('req.cookies:', req.cookies);
  res.send('hit send!');
})


var router = express.Router();


app.use('/api', router);

router.route('/').get(function jsonMidware(req,res, next){
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

// app.get('/', function mw1(req, res, next) {
//   console.log('one!');
//   return next();
// })

// app.get('/', function mw2(req, res) {
//   console.log('two!');
//   res.send('yippee!');
// })


app.listen(3000,function(){
  console.log("Live at Port 3000");
});
