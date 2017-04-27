import React, { Component } from 'react';
import Method from './Method';
import Route from './Route';
import Report from './Report';
const json = require('./../../../watchDog.json');
//console.log(json)
import Summaries from './../public/summaries';
//console.log(Summaries.getSummaries)

import JSONInterface from './../public/watchDogJSONInterface';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json,
      userRoutes: [],
      userReports: [],
      stateChangeLogs: []
    };
    this.displayRoute = this.displayRoute.bind(this);
    this.displayReport = this.displayReport.bind(this);
    this.responseSummaries = this.responseSummaries.bind(this);
    this.requestSummaries = this.requestSummaries.bind(this);
    this.highlightMethod = this.highlightMethod.bind(this);
  }

  displayRoute(arrRoutes, method) {
    //arrRoutes has GET / (for right now)
    //our method is GET (for right now)
    let tempRoute = [];
    const clearReport = [];

    arrRoutes.map(element => {
      if(element.includes(method)) tempRoute.push(this.state.json[element]['method'] + " " + this.state.json[element]['route']);
    });

    this.setState({ userRoutes: tempRoute });
    //clear off timeline text caused by other buttons
    this.setState({ userReports: clearReport });
    this.highlightMethod(method);
  }

  highlightMethod(method) {
    //method is equal to GET
    document.getElementById(method).style.backgroundColor = "#191816";
    document.getElementById(method).style.color = "white";

  }

  displayReport(route, index) {
    // element is "GET /"
    let tempReport = [];
    //pull timeline of only the matching method and route
    if (this.state.json[route]['method'] + " " + this.state.json[route]['route'] === route) {
      tempReport = (this.state.json[route]['timeline'])
    }
    //change state according to match
    this.setState({ userReports: tempReport });
    this.setState({ stateChangeLogs: JSONInterface.getStateChanges(this.state.json[tempRetrive]) });
    //change button color
    this.highlightMethod(index);
  }

  responseSummaries(log) {
    return Summaries.getSummaries(log).resSummaries;
  }

  requestSummaries(log) {
    if (Summaries.getSummaries(log).reqSummaries.length === 0) return "none";
    return Summaries.getSummaries(log).reqSummaries;
  }


  render() {
    return (
      <div className="mdl-layout mdl-js-layout">
        <div id="title"> Your Server Route Results! </div>

        <div className="App flex-container">

          <Method json={this.state.json} userRoutes={this.state.userRoutes} userReports={this.state.userReports}
            displayRoute={this.displayRoute} displayReport={this.displayReport} />

          <Route json={this.state.json} userRoutes={this.state.userRoutes} userReports={this.state.userReports}
            displayRoute={this.displayRoute} displayReport={this.displayReport} />

          <Report json={this.state.json} userRoutes={this.state.userRoutes} userReports={this.state.userReports} stateChangeLogs={this.state.stateChangeLogs}
            displayRoute={this.displayRoute} displayReport={this.displayReport} responseSummaries={this.responseSummaries} requestSummaries={this.requestSummaries} />

        </div>
      </div>
    );
  }
}

export default App;
