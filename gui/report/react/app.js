import React, { Component } from 'react';
import Method from './Method';
import Route from './Route';
import Report from './Report';
const json = require('./../../../watchDog.json');
import JSONInterface from './../public/watchDogJSONInterface';
import Summaries from './../public/summaries';

//console.log("this.state.json", json)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json,
      userRoutes: [],
      userReports: [],
      stateChangeLogs: [],
      currMethod: ""
    };
    this.displayRoute = this.displayRoute.bind(this);
    this.displayReport = this.displayReport.bind(this);
    this.responseSummaries = this.responseSummaries.bind(this);
    this.requestSummaries = this.requestSummaries.bind(this);
  }

  //fill state to populate routes
  displayRoute(arrRoutes, method) {
    //arrRoutes has GET / (for right now)
    //our method is GET (for right now)
    console.log('arrROutes:', arrRoutes)
    console.log('method: ', method)

    let tempRoute = [];
    let tempCurrMethod = '';
    const clearReport = [];

    arrRoutes.map(element => {
      if (element.includes(method)) {
        tempRoute.push(this.state.json[element]['method'] + " " + this.state.json[element]['route']);
        tempCurrMethod = method;
      }
    });

    this.setState({ userRoutes: tempRoute });
    this.setState({ currMethod: tempCurrMethod });
    //clear off timeline text caused by other buttons
    this.setState({ userReports: clearReport });

    <Route json={this.props.json} userRoutes={this.props.userRoutes} userReports={this.props.userReports}
          currMethod={this.props.currMethod}
          displayRoute={this.props.displayRoute} displayReport={this.props.displayReport} />
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
    this.setState({ stateChangeLogs: JSONInterface.getStateChanges(this.state.json[route]) });
  }

  responseSummaries(log) {
    if (Summaries.getSummaries(log).resSummaries.length === 0) return "none";
    return Summaries.getSummaries(log).resSummaries;
  }

  requestSummaries(log) {
    if (Summaries.getSummaries(log).reqSummaries.length === 0) return "none";
    return Summaries.getSummaries(log).reqSummaries;
  }


  render() {
    return (
      <div>
        <div id="title"> Your Server Route Results! </div>

        <div className="App flex-container">
          <Method json={this.state.json} userRoutes={this.state.userRoutes} userReports={this.state.userReports}
            currMethod={this.state.currMethod}
            displayRoute={this.displayRoute} displayReport={this.displayReport} />

          <Report json={this.state.json} userRoutes={this.state.userRoutes} userReports={this.state.userReports} stateChangeLogs={this.state.stateChangeLogs}
            displayRoute={this.displayRoute} displayReport={this.displayReport} responseSummaries={this.responseSummaries} requestSummaries={this.requestSummaries} />
        </div>
      </div>
    );
  }
}

export default App;
