/*
  TODO: Should config file control what is written to watchDog.json
  or should config file control how client parses watchDog.json
*/

const config = {
  routes: ['/'],
  resWatch: ['._headers'],
  reqWatch: []
}

module.exports = config;
