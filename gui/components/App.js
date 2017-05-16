import React, { Component } from 'react';
import Sidebar from './Sidebar.js';
import MainDisplay from './MainDisplay.js';
import PropTypes from 'prop-types';
import jsonInterface from './../js/jsonInterface.js';

const xpr  = require('./../expressive.json');

// console.log('hello???', xpr.testProp);

function getInitialState() {
  return {
    openMethodButtons: [],
    isRouteTreeView: true,
    activeTab: '',
    openTabs: [],
    history: []
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();

    this.onMethodButtonClick = this.onMethodButtonClick.bind(this);
    this.onSideTabClick = this.onSideTabClick.bind(this);
    this.onRouteButtonClick = this.onRouteButtonClick.bind(this);
    this.onMainTabClick = this.onMainTabClick.bind(this);
    this.escapeTab = this.escapeTab.bind(this);
    this.toggleResDeets = this.toggleResDeets.bind(this);
    this.toggleReqDeets = this.toggleReqDeets.bind(this);
    this.toggleChangeDeets = this.toggleChangeDeets.bind(this);
    this.toggleReportLine = this.toggleReportLine.bind(this);
  }

  render() {
    const routeIds = Object.keys(xpr).filter(key => key !== 'completedReqs');

    const sidebarEventHandlers = {
      onMethodButtonClick: this.onMethodButtonClick,
      onSideTabClick: this.onSideTabClick,
      onRouteButtonClick: this.onRouteButtonClick
    }

    const forRouteTree = {
      openMethodButtons: this.state.openMethodButtons,
      routeIds: routeIds
    }

    const tabInfo = {
      activeTab: this.state.activeTab,
      openTabs: this.state.openTabs
    }

    const mainDisplayEventHandlers = {
      onMainTabClick: this.onMainTabClick,
      escapeTab: this.escapeTab,
      toggleChangeDeets: this.toggleChangeDeets,
      toggleResDeets: this.toggleResDeets,
      toggleReqDeets: this.toggleReqDeets,
      toggleReportLine: this.toggleReportLine
    }



    return (
      <div id="App">
        <Sidebar isRouteTreeView={this.state.isRouteTreeView} eventHandlers={sidebarEventHandlers} forRouteTree={forRouteTree}/>
        <MainDisplay tabInfo={tabInfo} history={this.state.history} eventHandlers={mainDisplayEventHandlers}/>
      </div>
    )
  }

  //Methods for child components!

  onSideTabClick(tabType) {
    let currTab = this.state.isRouteTreeView ? 'expressive' : 'settings';
    if (tabType !== currTab) this.setState({isRouteTreeView: (tabType === 'expressive')})
  }

  onMethodButtonClick(method) {
    const openMethodButtons = this.state.openMethodButtons.slice();
    if (openMethodButtons.includes(method)) openMethodButtons.splice(openMethodButtons.indexOf(method), 1);
    else openMethodButtons.push(method);
    this.setState({openMethodButtons});
  }

  onRouteButtonClick(routeId) {
    const openTabs = this.state.openTabs.slice();
    if (!openTabs.includes(routeId)) openTabs.push(routeId);
    let activeTab = routeId;

    let updateHistory = false;
    let history = this.state.history.slice();
    history.forEach((reportState, i) => {
      if (reportState.routeId === routeId && i !== history.length - 1) {
        let toEnd = history.splice(i, 1);
        history = history.concat(toEnd);
        updateHistory = true;
      } else if (reportState.routeId === routeId) updateHistory = true;
    });

    if (!updateHistory) history.push({
      routeId,
      reportLines: jsonInterface.getReportLines(xpr, routeId)
    });
    this.setState({openTabs, activeTab, history});
  }

  onMainTabClick(routeId) {
    let history = this.state.history.slice();
    history.forEach((reportState, i) => {
      if (reportState.routeId === routeId && i !== history.length - 1) {
        const toEnd = history.splice(i,1);
        history = history.concat(toEnd);
      }
    })

    if (this.state.activeTab !== routeId) this.setState({activeTab: routeId, history});
  }

  escapeTab(routeId) {
    const openTabs = this.state.openTabs.slice();
    openTabs.splice(openTabs.indexOf(routeId), 1);

    let history = this.state.history;
    history.forEach((reportState, i) => {
      if (reportState.routeId === routeId) history.splice(i, 1);
    });

    let activeTab = history.length ? history[history.length - 1].routeId : '';

    this.setState({activeTab, openTabs, history});
  }

  toggleChangeDeets(lineNum){

    let history = this.state.history.slice();

    const newVal = (history[history.length - 1]['reportLines'][lineNum]['detailsDisplay'] === 'change' ? '' : 'change');
    history[history.length - 1]['reportLines'][lineNum]['detailsDisplay'] = newVal;

    this.setState({history});
  }

  toggleResDeets(lineNum){
    let history = this.state.history.slice();
    const newVal = (history[history.length - 1]['reportLines'][lineNum]['detailsDisplay'] === 'res' ? '' : 'res');
    history[history.length - 1]['reportLines'][lineNum]['detailsDisplay'] = newVal;

    this.setState({history});
  }

  toggleReqDeets(lineNum){
    let history = this.state.history.slice();
    const newVal = (history[history.length - 1]['reportLines'][lineNum]['detailsDisplay'] === 'req' ? '' : 'req');
    history[history.length - 1]['reportLines'][lineNum]['detailsDisplay'] = newVal;

    this.setState({history});
  }

  toggleReportLine(lineNum){
    let history = this.state.history.slice();
    const newVal = history[history.length - 1]['reportLines'][lineNum]['isOpen'] === true ? false : true;
    history[history.length - 1]['reportLines'][lineNum]['isOpen'] = newVal;

    this.setState({history});
  }

}

module.exports = App;
