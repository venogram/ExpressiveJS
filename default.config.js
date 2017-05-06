/*
  TODO: Should config file control what is written to expressive.json
  or should config file control how client parses expressive.json
*/

const config = {
  entry: './test-servers/glenn-server.js', //relative path to server file to test
  host: 'http://localhost:3000', // port the dev server listens to
  testRoutes: [
<<<<<<< HEAD
    {method: "GET", uri:"/"},
    {method: "GET", uri:"/redirect"},
    {method: "POST", uri:"/", body:"Hello"}
=======
    {method: "GET", uri:"/"}
    // {method: "GET", uri:"/redirect"},
    // {method: "POST", uri:"/"}
>>>>>>> e35308a0ae5ab6567608573fc45aa4a5bd0900e7
  ], // specify routes to test. objects must be formatted according to the request module options
  useDefaults: true, // if false, default config will not augment provided config


  // YET TO IMPLEMENT CONFIG SETTINGS
  watch: ['headers', 'response body', 'request data'], // flag certain things in req/res objects to follow
  abandonRequest: 5, // time (per request) to wait before abandoning the request
  silentServer: true, // if false, xpr command will log server's log statements
  wipeCookies: false, // if true, cookies are cleared in between each request
  overwriteTest: true, // if false, a second test will not override first test
}

module.exports = config;
