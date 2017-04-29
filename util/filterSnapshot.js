/*
  uses the config file to filter out unecessary information from the req and res
  snapshots

  TODO: make sure this function is being used in initTracking & trackState
*/

const config = require('./../expressive.config.js');

function filterSnapshot(snapshot, reX) {
  if (reX !== 'req' && reX !== 'res') throw new Error('bad input in filterSnapshot');
  const result = {};
  const paths = (reX === 'req' ? config.reqWatch : config.resWatch);

  paths.forEach(path => {
    Object.keys(snapshot).forEach(key => {
      if (path.indexOf(key) === 0) {
        const pathArr = path.split('.');

      }
    })
  })


  })

}
