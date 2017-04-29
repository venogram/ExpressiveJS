/*
  TODO: Should config file control what is written to watchDog.json
  or should config file control how client parses watchDog.json
*/

const config = {
  entry: './test-servers/ryan-server.js',

  host: 'http://localhost:3000',

  testRoutes: [
    {method: "GET", route:"/", body:""},
    {method: "GET", route:"/route", body:""}
  ],

  resWatch: ['._headers'],
  reqWatch: [],

  useDefaults: true,
  outputFile: ''
}

module.exports = config;
