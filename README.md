<p align="center"><a href='http://expressivejs.io/'><img alt="expressive" src="https://raw.githubusercontent.com/venogram/ExpressiveJS/master/gui/report/public/images/blackEXPRLogo@2x.png" height="20%" width="20%"></a></p>




# Expressive.js
> End to end server route tracking for [Express](https://expressjs.com/) applications.

#### Note: Expressive is in active development.  Follow our GitHub repo for updates.


### Install
```$ npm install expressivejs --save-dev```



## Setup

### 1) Modify Express server files
Replace all instances of  ```var express = require('express');``` with ```var express = require('expressivejs');```

This will enable Expressive to progressively document the state of client requests and server responses.


### 2) *(Optional)* Create a configuration file

This file should be called __expressive.config.js__ and be located in your application's root directory.

#### Options:
TBD

#### Default Settings:
TBD



## Testing Server Routes

### Command Line Scripts

__```$ xpr-test```: Test your server routes__.  Sends http requests to your Express server using request methods, routes, and bodies specified either by your __expressive.config.js__ configuration file or by Expressive's default settings.  This will create an __expressive.json__ file in your application's root directory where information on request and response states is stored.

__```$ xpr-display```: Render a visualization__ of your server routes based on the __expressive.json__ file created from the *xpr-test* command.

__```$ xpr```: Test your server routes__ and then __render a visualization__.  Equivalent to running *xpr-test* followed by *xpr-display*.



## Important

### Do not alter res.locals._XPR
Any server middleware that alters **res.locals._XPR** will interfere with Expressive's functionality.  Expressive tracks the state of client requests and server responses by storing information at the _XPR key within the locals property of the server response body.

### Expressive is not for use in production
Be sure to change all instances of ```var express = require('expressivejs');``` back to ```var express = require('express');``` before running your application for non-testing purposes.