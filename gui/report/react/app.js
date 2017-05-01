import React, { Component } from 'react';
import Method from './Method';
import Route from './Route';
import Report from './Report';
const json = require('./../../../expressive.json');
import JSONInterface from './../public/expressiveJSONInterface';
import Summaries from './../public/summaries';

import style from './../public/scss/style.scss';

//console.log('json', json)

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
      openTabs: [],
      selected: []
    };
    this.displayRoute = this.displayRoute.bind(this);
    this.displayReport = this.displayReport.bind(this);
    this.responseSummaries = this.responseSummaries.bind(this);
    this.requestSummaries = this.requestSummaries.bind(this);
    this.displayReportFromTabs = this.displayReportFromTabs.bind(this);
    this.highlightTab = this.highlightTab.bind(this);
    this.closeTab = this.closeTab.bind(this);
  }

  //update state to populate routes
  displayRoute(arrRoutes, method) {
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

  //display report according to the selected route
  displayReport(route) {
    let tempReport = [];
    let tempOpenTabs = this.state.openTabs;
    let tempCurrTab = route;

    //find timeline of only the selected method and route
    if (this.state.json[route]['method'] + " " + this.state.json[route]['route'] === route) {
      tempReport = (this.state.json[route]['timeline'])
    }

    //create new tabs, excludes duplicates
    if (!this.state.openTabs.includes(route)) {
      tempOpenTabs.push(route);
    }
    //change state according to selected method and route
    this.setState({ userReports: tempReport });
    this.setState({ stateChangeLogs: JSONInterface.getStateChanges(this.state.json[route]) });

    //update list of open tabs
    this.setState({ openTabs: tempOpenTabs });

    //update current selected tab
    this.setState({ currTab: tempCurrTab });
  }

  //display report according to the selected tab
  displayReportFromTabs(route) {
    let emptiness = []
    let tempReport = [];
    let tempCurrTab = route;

    //empties userReports
    this.setState({ userReports: emptiness });

    //find timeline of only the selected method and route
    if (this.state.json[route]['method'] + " " + this.state.json[route]['route'] === route) {
      tempReport = (this.state.json[route]['timeline'])
    }

    //change state according to selected method and route
    this.setState({ userReports: tempReport });
    this.setState({ stateChangeLogs: JSONInterface.getStateChanges(this.state.json[route]) });

    //update current selected tab
    this.setState({ currTab: tempCurrTab })
  }

  //generate summary lines for req and res objects
  responseSummaries(log) {
    if (Summaries.getSummaries(log).resSummaries.length === 0) return "none";
    return Summaries.getSummaries(log).resSummaries;
  }
  requestSummaries(log) {
    if (Summaries.getSummaries(log).reqSummaries.length === 0) return "none";
    return Summaries.getSummaries(log).reqSummaries;
  }

  //highlight selected tab
  highlightTab(index) {
    let tempSelected = this.state.selected;
    let notSelected = 'notSelected';

    //change all tabs class to notSelected
    //give class selcted to the clicked tab
    if (this.state.selected[index] === undefined) {
      for (let i = 0; i < tempSelected.length; i += 1) {
        if (tempSelected[i] === 'selected') tempSelected[i] = notSelected;
      }
      tempSelected.push('selected');
    } else if (this.state.selected[index] === notSelected) {
      for (let i = 0; i < tempSelected.length; i += 1) {
        if (tempSelected[i] === 'selected') tempSelected[i] = notSelected;
      }
      tempSelected[index] = 'selected';
      this.setState({ selected: tempSelected })
    }
  }

  closeTab(index) {
    let emptiness = [];
    let tempOpenTabs = this.state.openTabs;
    console.log("list of tabs before clicking x", this.state.openTabs)
    tempOpenTabs.splice(index, 1);
    this.setState({ openTabs: tempOpenTabs });
    console.log("list of tabs after closing:", this.state.openTabs);

    //clear the list?
    this.setState({ userReports: emptiness })
    console.log("userReport state after clicking x", this.state.userReports)
  }

  render() {
    return (
      <div>

        <div id="title"> <img src="./../whiteLogo.png"/> </div>


        <div className="App flex-container">
          <Method json={this.state.json} userRoutes={this.state.userRoutes} userReports={this.state.userReports}
            currMethod={this.state.currMethod}
            displayRoute={this.displayRoute} displayReport={this.displayReport}
            openTabs={this.state.openTabs} />

          <Report json={this.state.json} userRoutes={this.state.userRoutes} userReports={this.state.userReports} stateChangeLogs={this.state.stateChangeLogs}
            selected={this.state.selected}
            displayRoute={this.displayRoute} displayReport={this.displayReport} responseSummaries={this.responseSummaries} requestSummaries={this.requestSummaries}
            openTabs={this.state.openTabs} displayReportFromTabs={this.displayReportFromTabs}
            currTab={this.state.currTab} highlightTab={this.highlightTab} closeTab={this.closeTab} />
        </div>
      </div>
    );
  }
}

export default App;
