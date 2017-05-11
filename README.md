<p align="center"><a href='http://expressivejs.io/'><img alt="expressive" src="https://raw.githubusercontent.com/venogram/ExpressiveJS/master/gui/report/public/images/blackEXPRLogo@2x.png" height="20%" width="20%"></a></p>



# Expressive.js
Expressive is a developer tool that tracks and visualizes server routes in [Express](https://expressjs.com/) applications.  Useful for debugging and teaching alike, Expressive enables developers to send client requests to their Express server, and then render a dynamic and comprehensive visualization of server state throughout the lifespan of each request -- *all from the command line*.



### Install
```$ npm install expressivejs --save-dev```



## Setup

### 1) Modify Express server files
Replace all instances of  ```require('express')``` with ```require('expressivejs')```.  This will enable Expressive to progressively document the state of client requests and server responses.


### 2) Create a configuration file

This file should be called __expressive.config.js__ and be located in your application's root directory.

#### Option 1: Use the command line
TBD

#### Option 2: Create expressive.config.js manually 
TBD



## Testing Server Routes

### Command Line Scripts

__```$ xpr-test```: Test your server routes__.  Sends http requests to your Express server as specified in your __expressive.config.js__ file.  This will create an __expressive.json__ file in which information on request and response states is stored.  If the file already exists from previous tests, it will be overwritten.

__```$ xpr-build```: Bundle data__ from the __expressive.json__ file created using the *xpr-test* command for use in rendering a visualization of your server routes.

__```$ xpr-display```: Render a visualization__ of your server routes based on the data bundled from the *xpr-test* command.

__```$ xpr```: Test your server routes__, then __bundle the collected data__, and then __render a visualization__.  Equivalent to running *xpr-test* followed by *xpr-build* followed by *xpr-display*.



## Important

### Do not alter res.locals._XPR
Any server middleware that alters **res.locals._XPR** will interfere with Expressive's functionality.  Expressive tracks the state of client requests and server responses by storing information at the _XPR key within the locals property of the server response body.

### Expressive is not for use in production
Before running your application for non-testing purposes, be sure to change all instances of ```require('expressivejs')``` in your server files back to ```require('express')```.

### Expressive is in active development.
Follow our [GitHub](https://github.com/venogram/ExpressiveJS) repo for updates.



## Contributors
[Glenn Alexander](https://github.com/gcz23) | [Ryan Fowlkes Smith](https://github.com/ryanfowlkes) | [Kangseon Cho](https://github.com/littletoy) | [Mary Snow](https://github.com/Mary-Snow)