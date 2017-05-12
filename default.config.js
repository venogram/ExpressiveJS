/*
  TODO: Should config file control what is written to expressive.json
  or should config file control how client parses expressive.json
*/

const config = {
  entry: './test-servers/glenn-server.js', //relative path to server file to test
  host: 'http://localhost:3000', // port the dev server listens to
  testRoutes: [

    {method: "GET", uri:"/"},
    {method: "GET", uri:"/redirect"},
    {method: "GET", uri:"/route1"},
    {method: "POST", uri:"/"}

    // {method: "POST", uri:"/", body:"i am a request body"},
    // {method: "GET", uri:"/route1"},
    // {method: "GET", uri:"/route2"},
    // {method: "GET", uri:"/route3"}
  ], // specify routes to test. objects must be formatted according to the request module options
  silentServer: false, // if false, xpr command will log server's log statements
  wipeCookies: false, // if true, cookies are cleared in between each request
  outputDir: '/',
  //Should test with database calls
  abandonRequest: 3, // time (per request) to wait before abandoning the request
}

module.exports = config;
