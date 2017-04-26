import React, { Component } from 'react';
import Method from './method';
import Route from './route';
import Report from './report';
const watchData = require('./../../../watchDog.json');
//console.log(watchData)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watchData,
      userRoutes: [],
      userReports: []
    };
    this.displayRoute = this.displayRoute.bind(this);
    this.displayReport = this.displayReport.bind(this);
  }

  displayRoute(method) {
    //our method is get or post (for right now)
    let tempRoute = [];
    const clearReport = [];

    // Object.keys(this.state.watchData).map((element) => {
      //if method match, get route button
      if (this.state.watchData['method'] === method) {
        tempRoute.push(this.state.watchData['route'])
      }
    // })
    this.setState({ userRoutes: tempRoute });
    //clear off timeline text caused by other buttons
    this.setState({ userReports: clearReport });
  }

  displayReport(route) {
    let tempReport = [];
    // console.log(route)
    //Object.keys(this.state.watchData).map((element) => {
      // element is "/"
      if (this.state.watchData['route'] === route) {
        tempReport = (this.state.watchData['timeline'])
      }
    //})
    this.setState({ userReports: tempReport });
  }



  render() {
    return (
      <div className="mdl-layout mdl-js-layout">
        <div id="title"> Your Server Route Results! </div>

        <div className="App flex-container">

          <Method watchData={this.state.watchData} userRoutes={this.state.userRoutes} userReports={this.state.userReports}
            displayRoute={this.displayRoute} displayReport={this.displayReport} />

          <Route watchData={this.state.watchData} userRoutes={this.state.userRoutes} userReports={this.state.userReports}
            displayRoute={this.displayRoute} displayReport={this.displayReport} />

          <Report watchData={this.state.watchData} userRoutes={this.state.userRoutes} userReports={this.state.userReports}
            displayRoute={this.displayRoute} displayReport={this.displayReport} />

        </div>
      </div>
    );
  }
}

export default App;
