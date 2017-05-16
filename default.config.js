/*
Defines the default settings for xpr-test when left undefined by developer
*/

const config = {
  entry: './server.js', //relative path to server file to test
  host: 'http://localhost:3000', // port the dev server listens to
  requests: [{ method: "GET", route: "/" }], // specify routes to test. objects must be formatted according to the request module options
  silentServer: false, // if false, xpr command will log server's log statements
  wipeCookies: false, // if true, cookies are cleared in between each request
  outputDir: '/',
  abandonRequest: 3, // time in seconds (per request) to wait before abandoning the request
}

module.exports = config;
