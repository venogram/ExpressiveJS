import React, { Component } from 'react';
import MainTabsMenu from './MainTabsMenu.js';
import Report from './Report.js';
import PropTypes from 'prop-types';

class MainDisplay extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    const tabEventHandlers = {
      onMainTabClick: this.props.eventHandlers.onMainTabClick,
      escapeTab: this.props.eventHandlers.escapeTab
    }

    const reportEventHandlers = {
      toggleResDeets: this.props.eventHandlers.toggleResDeets,
      toggleReqDeets: this.props.eventHandlers.toggleReqDeets,
      toggleChangeDeets: this.props.eventHandlers.toggleChangeDeets,
      toggleReportLine: this.props.eventHandlers.toggleReportLine
    }

    const reportState = this.props.history.length ? this.props.history[this.props.history.length - 1] : null;

    return (
      <div id="MainDisplay">
        <MainTabsMenu openTabs={this.props.tabInfo.openTabs} activeTab={this.props.tabInfo.activeTab} eventHandlers={tabEventHandlers}/>
        <Report reportState={reportState} eventHandlers={reportEventHandlers}/>
      </div>
    )
  }
}

MainDisplay.propTypes = {
  tabInfo: PropTypes.object,
  history: PropTypes.array,
  eventHandlers: PropTypes.object
}

module.exports = MainDisplay;
