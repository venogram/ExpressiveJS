/*
  TODO: Should config file control what is written to watchDog.json
  or should config file control how client parses watchDog.json
*/

const config = {
  host: 'http://localhost:3000',
  routes: ['/'],
  resWatch: ['._headers'],
  reqWatch: [],
  useDefaults: true,
  outputFile: ''
}

module.exports = config;
