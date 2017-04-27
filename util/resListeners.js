/*
  stores listeners to be placed on the response object
*/
const jsonController = require("./jsonController.js");
module.exports = {
  finish: (err, res) => {
    const now = Date.now();
    res.locals._WD.end = now;
    res.locals._WD.duration = res.locals._WD.end - res.locals._WD.start;
    res.locals._WD.error = err;
    res.locals._WD.statusCode = res.statusCode;
    res.locals._WD.statusMessage = res.statusMessage;
    jsonController.overwrite(res.locals._WD);
  }
}
