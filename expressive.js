/*
  expressive.js wraps express, inserting middleware to track how the server
  response and client request objects change as they travel through the developer's
  middleware.

*/

const express = require('express');
const app = express();
const getAppMethodArgs = require('./util/getAppMethodArgs.js');
const jsonController = require('./util/jsonController.js');
const serverListeners = require('./util/serverListeners.js');


// //wrapper for app.METHOD
// //wraps developer midware with expressive midware
// function insertExpressiveMidware(...args) {
//   const expressiveMidware = getAppMethodArgs(args);
//   return myApp[method](...expressiveMidware);
// }

// //stores route and method in json object for creation of default config file
// //then wraps app.METHOD
// function set(...args) {
//   const route = args[0];
//   jsonController.addRoute(method, route);
//   return insertExpressiveMidware(myApp, method, ...args);
// }

const requestMethods = ['all', 'checkout', 'copy', 'delete', 'get', 'head', 'lock', 'merge',
  'mkactivity', 'mkcol', 'move', 'm-search', 'notify', 'options', 'patch', 'post',
  'purge', 'put', 'report', 'search', 'subscribe', 'trace', 'unlock', 'unsubscribe'];

const expressive = () => {
  const expressiveObj = {

    listen: (...args) => {
      const server = app.listen(...args);
      //set up server listeners!
      Object.keys(serverListeners).forEach(event => {
        server.on(event, serverListeners[event]);
      });
      //sends message to parent process that it may start firing requests!
      if (process.send) process.send('listening');
      return server;
    },

    use: (...args) => app.use(...getAppMethodArgs(args)),

    route: (path) => {
      const returnedRoute = app.route(path);

      requestMethods.forEach(method => {
        const originalMethod = returnedRoute[method];
        returnedRoute[method] = (...args) => originalMethod.call(returnedRoute, ...getAppMethodArgs(args));
      });

      const originalUse = returnedRoute.use;
      returnedRoute.use = (...args) => originalUse.call(returnedRoute, ...getAppMethodArgs(args));

      return returnedRoute;
    },

    param: (...args) => app.param(...getAppMethodArgs(args)),

    // These do not alter the request and response so there is no need to track them
    // disable: () => {},
    // disabled: () => {},
    // enable: () => {},
    // enabled: () => {},
    // engine: () => {},
    // path: () => {},
    // render: () => {},
    // set: () => {},
  }

  //assigns app.METHOD for all request methods
  requestMethods.forEach(method => {
    expressiveObj[method] = (...args) => app[method](...getAppMethodArgs(args));
  });


  expressive.Router = (...args) => {
    const router = express.Router(...args);

    requestMethods.forEach(method => {
      const originalMethod = router[method];
      router[method] = (...methodArgs) => originalMethod.call(router, ...getAppMethodArgs(methodArgs));
    })
    
    const originalUse = router.use;
    router.use = (...useArgs) => originalUse.call(router, ...getAppMethodArgs(methodArgs));

    const originalParam = router.param;
    router.param = (...paramArgs) => originalParam.call(router, ...getAppMethodArgs(paramArgs));

    const originalRoute = router.route;
    router.route = (path) => {
      const returnedRoute = originalRoute.call(router ,path);

      requestMethods.forEach(routeMethod => {
        const originalMethod = returnedRoute[routeMethod];
        returnedRoute[routeMethod] = (...routeArgs) => originalMethod.call(returnedRoute, ...getAppMethodArgs(routeArgs));
      })

      const originalRouteUse = returnedRoute.use;
      returnedRoute.use = (...routeUseArgs) => originalRouteUse.call(returnedRoute, ...getAppMethodArgs(routeUseArgs));

      return returnedRoute;
    }

    return router;
  }



  //FALLBACKS: assign all undefined properties and methods of express and express app 
  //to expressive and expressiveObj respectively
  Object.keys(app).forEach(key => {
    if (!expressiveObj.hasOwnProperty(key)) expressiveObj[key] = app[key];
  });
  Object.keys(express).forEach(key => {
    if (!expressive.hasOwnProperty(key)) expressive[key] = express[key];
  });

  return expressiveObj;
}



module.exports = expressive;
