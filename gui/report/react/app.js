import React, { Component } from 'react';
import XprAndSettingsTab from './xprAndSettingsTab';
import Report from './report';
const json = require('./../../../expressive.json');
import JSONInterface from './../public/expressiveJSONInterface';
import Summaries from './../public/summaries';

import style from './../public/scss/style.scss';

console.log(json)

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
      xprSettingsTab: [{"xpr":"xprSelected"},{"Settings":"xprNotSelected"}],
      details: {}
    };
    this.displayRoute = this.displayRoute.bind(this);
    this.displayReport = this.displayReport.bind(this);
    this.responseSummaries = this.responseSummaries.bind(this);
    this.requestSummaries = this.requestSummaries.bind(this);
    this.displayReportFromTabs = this.displayReportFromTabs.bind(this);
    this.initAndHighlightTab = this.initAndHighlightTab.bind(this);
    this.closeTab = this.closeTab.bind(this);
    this.toggleXprTab = this.toggleXprTab.bind(this);
    this.detailedRequestSnapshot = this.detailedRequestSnapshot.bind(this);
    this.detailedResponseSnapshot = this.detailedResponseSnapshot.bind(this);
  }

  //update state to populate routes
  displayRoute(arrRoutes, method) {
    let tempRoute = [];
    let tempCurrMethod = '';
    const clearReport = [];
    const clearDetails = {};

    arrRoutes.map(element => {
      if (element.includes(method)) {
        tempRoute.push(this.state.json[element]['method'] + " " + this.state.json[element]['route']);
        tempCurrMethod = method;
      }
    });

    this.setState({ userRoutes: tempRoute });
    this.setState({ currMethod: tempCurrMethod });
    //clear off timeline & details text caused by other buttons
    this.setState({ userReports: clearReport });
    this.setState({ details: clearDetails })
  }

  //display report according to the selected route
  displayReport(route) {
    let tempReport = [];

    //find timeline of only the selected method and route
    if (this.state.json[route]['method'] + " " + this.state.json[route]['route'] === route) {
      tempReport = (this.state.json[route]['timeline'])
    }
    //change state according to selected method and route
    this.setState({ userReports: tempReport });
    this.setState({ stateChangeLogs: JSONInterface.getStateChanges(this.state.json[route]) });
  }

  //create a new tab and tell what tab is selected
  initAndHighlightTab(element) {
    let tempOpenTabs = this.state.openTabs;
    let tempCurrTab = element;
    //a variable to tell if element exist in the openTab state.
    let include = false;

    //create new tabs if no tabs are present, else add new tab
    //provided there is no same named tab already open
    if (this.state.openTabs.length === 0) {
      let newObj = {};
      newObj[element] = 'selected';
      tempOpenTabs.push(newObj);
      this.setState({ openTabs: tempOpenTabs })
    } else {
      for (let i = 0; i < this.state.openTabs.length; i += 1) {
        if (this.state.openTabs[i][Object.keys(this.state.openTabs[i])] === 'selected') {
          tempOpenTabs[i][Object.keys(tempOpenTabs[i])] = 'notSelected';
        }
        //change the class of what you clicked to selected
        if(tempOpenTabs[i][element] === "notSelected") tempOpenTabs[i][element] = 'selected';
      }

      for (let i = 0; i < this.state.openTabs.length; i += 1) {
        //check if the button already exists
        if (Object.keys(this.state.openTabs[i])[0] === element) include = true;
      }
      //since no same name tab was found, create a new tab
      if (include === false) {
        let newObj = {};
        newObj[element] = 'selected';
        tempOpenTabs.push(newObj);
      }
      //new list of open tabs
      this.setState({ openTabs: tempOpenTabs });
    }
    //update current selected tab
    this.setState({ currTab: tempCurrTab });
  }

  //display report according to the selected tab
  displayReportFromTabs(route) {
    let emptiness = [];
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
    this.setState({ currTab: tempCurrTab });
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

  //remove an open tab
  closeTab(index) {
    let emptiness = [];
    let tempOpenTabs = this.state.openTabs;
    tempOpenTabs.splice(index, 1);
    this.setState({ openTabs: tempOpenTabs });

    //clear the list
    this.setState({ userReports: emptiness })
  }

  //function that will change class (xprSelected/notSelected) and what gets displayed to side bar
  toggleXprTab(element) {
    let tempXprSettingsTab = this.state.xprSettingsTab;

    tempXprSettingsTab = tempXprSettingsTab.map((tab, index) => {
      if(tab[Object.keys(tab)[0]] === 'xprSelected') {
         tab[Object.keys(tab)[0]] = 'xprNotSelected';
         return tab;
      }
      return tab;
    })
    tempXprSettingsTab = tempXprSettingsTab.map(tab => {
       if(tab[Object.keys(tab)[0]] === 'xprNotSelected' && Object.keys(tab)[0] === element) {
        tab[Object.keys(tab)[0]] = 'xprSelected';
        return tab;
       }
       return tab;
    })
    //change state after class change
    this.setState({ xprSettingsTab:tempXprSettingsTab })
  }

  //two functions below will pull res/req objects from proper timeline
  detailedRequestSnapshot(index) {
    let tempDetails = {};
    let fullRequest = this.state.userReports[index].req;
    //should do logic to create tempDetails to output only relevant info on req obj
    for(let key in fullRequest['headers']) {
      tempDetails['headers-' + key] = fullRequest['headers'].key;
    }
    tempDetails['complete'] = fullRequest.complete.toString();
    //tempDetails['params'] = fullRequest.params; //is an object therefore, need to see if these ever get filled
    //tempDetails['query'] = fullRequest.query; //is an object therefore, need to see if these ever get filled
    tempDetails['socketDestroyed'] = fullRequest.socket.destroyed.toString();
    //tempDetails['trailers'] = fullRequest.trailers; //is an object therefore, need to see if these ever get filled
    this.setState({details: tempDetails});
  }
  detailedResponseSnapshot(index) {
    let tempDetails = {};
    let fullResponse = this.state.userReports[index].res;
    //should do logic to create tempDetails to output only relevant info on res obj
    tempDetails['finished'] = fullResponse.finished.toString();
    //tempDetails['locals'] = fullResponse.locals; //is an object therefore, need to see if these ever get filled
    tempDetails['shouldKeepAlive'] = fullResponse.shouldKeepAlive.toString();
    tempDetails['statusCode'] = fullResponse.statusCode;
    tempDetails['statusMessage'] = fullResponse.statusMessage;
    this.setState({details: tempDetails});
  }

  render() {
    return (
      <div className="App flex-container">

        <XprAndSettingsTab json={this.state.json} userRoutes={this.state.userRoutes} userReports={this.state.userReports}
          currMethod={this.state.currMethod}
          displayRoute={this.displayRoute} displayReport={this.displayReport}
          openTabs={this.state.openTabs} initAndHighlightTab={this.initAndHighlightTab}
          xprSettingsTab={this.state.xprSettingsTab} toggleXprTab={this.toggleXprTab}/>

        <Report json={this.state.json} userRoutes={this.state.userRoutes} userReports={this.state.userReports} stateChangeLogs={this.state.stateChangeLogs}
          displayRoute={this.displayRoute} displayReport={this.displayReport} responseSummaries={this.responseSummaries} requestSummaries={this.requestSummaries}
          displayReportFromTabs={this.displayReportFromTabs} openTabs={this.state.openTabs}
          currTab={this.state.currTab} closeTab={this.closeTab} initAndHighlightTab={this.initAndHighlightTab}
          detailedResponseSnapshot={this.detailedResponseSnapshot} detailedRequestSnapshot={this.detailedRequestSnapshot} details={this.state.details}/>
      </div>
    );
  }
}

export default App;