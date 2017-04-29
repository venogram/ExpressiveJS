# watch-dog
End to end server tracking for optimal debugging

Note: WE CLAIM _WD NAMESPACE ON RES.LOCALS

---------------------------------------

setup a watchDog.log to keep track of what watchDog does and how it's performing?

BUG: app.use changes req.path for some reason.  This causes mislabeling of keys in 
json object


NOTE:  Can get info on middleware functions using 
  res.socket.parser.incoming.route.stack