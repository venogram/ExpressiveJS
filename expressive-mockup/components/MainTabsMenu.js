import React, { Component } from 'react';
import MainTab from './MainTab.js';
import PropTypes from 'prop-types';

function MainTabsMenu(props) {
  const tabs = props.openTabs.map((routeId, i) => {
    return (
      <MainTab routeId={routeId} activeTab={props.activeTab} onMainTabClick={props.eventHandlers.onMainTabClick}
      escapeTab={props.eventHandlers.escapeTab} key={i}/>
  )
  })

  return (
    <div id="MainTabsMenu">
      {tabs}
    </div>
  )
}

MainTabsMenu.propTypes = {
  openTabs: PropTypes.array,
  activeTab: PropTypes.string,
  eventHandlers: PropTypes.object
}

module.exports = MainTabsMenu;
