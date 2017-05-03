/*
  TODO: Should config file control what is written to expressive.json
  or should config file control how client parses expressive.json
*/

const config = {
  entry: './test-servers/glenn-server.js',
  host: 'http://localhost:3000',
  testRoutes: [
    {method: "GET", uri:"/"}
    // {method: "GET", uri:"/fakeRoute"}
  ],
  watch: [],
  abandonTime: 10,
  useDefaults: true,
}

module.exports = config;
