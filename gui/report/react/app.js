import React, { Component } from 'react';
import Method from './Method';
import Route from './Route';
import Report from './Report';
const json = require('./../../../watchDog.json');
import JSONInterface from './../public/watchDogJSONInterface';
import Summaries from './../public/summaries';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json,
      userRoutes: [],
      userReports: [],
      stateChangeLogs: [],
      currMethod: "",
      currTab: "",
      openTabs:[]
    };
    this.displayRoute = this.displayRoute.bind(this);
    this.displayReport = this.displayReport.bind(this);
    this.responseSummaries = this.responseSummaries.bind(this);
    this.requestSummaries = this.requestSummaries.bind(this);

    this.displayReportFromTabs = this.displayReportFromTabs.bind(this);
  }

  //fill state to populate routes
  displayRoute(arrRoutes, method) {
    //arrRoutes has GET / (for right now)
    //our method is GET (for right now)

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

  }

  displayReport(route, index) {
    // element is "GET /"
    let tempReport = [];
    let tempOpenTabs = this.state.openTabs;
    let tempCurrTab = route;

    //pull timeline of only the matching method and route
    if (this.state.json[route]['method'] + " " + this.state.json[route]['route'] === route) {
      tempReport = (this.state.json[route]['timeline'])
    }

    //add to list of new tabs if not already there
    if(!this.state.openTabs.includes(route)) {
      tempOpenTabs.push(route);
    }
    //change state according to match
    this.setState({ userReports: tempReport });
    this.setState({ stateChangeLogs: JSONInterface.getStateChanges(this.state.json[route]) });

    //new list of open tabs
    this.setState({ openTabs: tempOpenTabs });

    //change the state view with currTab
    this.setState({ currTab: tempCurrTab });
  }

  displayReportFromTabs(route, index) {
    // route is "GET /"
    let emptiness = []
    let tempReport = [];
    let tempCurrTab = route;

    //clear off existing state of userReports
    this.setState({ userReports: emptiness });

    //pull timeline of only the matching method and route
    if (this.state.json[route]['method'] + " " + this.state.json[route]['route'] === route) {
      tempReport = (this.state.json[route]['timeline'])
    }

    //change state according to match
    this.setState({ userReports: tempReport });
    this.setState({ stateChangeLogs: JSONInterface.getStateChanges(this.state.json[route]) });

    //the tab you are currently on
     this.setState({ currTab: tempCurrTab })
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
            displayRoute={this.displayRoute} displayReport={this.displayReport}
            openTabs={this.state.openTabs}/>

          <Report json={this.state.json} userRoutes={this.state.userRoutes} userReports={this.state.userReports} stateChangeLogs={this.state.stateChangeLogs}
            displayRoute={this.displayRoute} displayReport={this.displayReport} responseSummaries={this.responseSummaries} requestSummaries={this.requestSummaries}
            openTabs={this.state.openTabs} displayReportFromTabs={this.displayReportFromTabs}
            currTab={this.state.currTab}/>
        </div>
      </div>
    );
  }
}

export default App;
