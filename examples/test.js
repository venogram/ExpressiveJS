const Browser = require('zombie');
const browser = new Browser();



function routeTest(route) {
  browser.visit(route, () => {console.log("**************************************************",browser.resources[0].response)})
}

routeTest('http://localhost:3000/redirect');