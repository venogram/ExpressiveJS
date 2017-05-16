import React, { Component } from 'react';
import SideTab from './SideTab.js';
import PropTypes from 'prop-types';

function SideTabsMenu(props) {
  return (
    <div id="SideTabsMenu">
      <SideTab tabType="expressive" onSideTabClick={props.onSideTabClick} isRouteTreeView={props.isRouteTreeView}/>
      <SideTab tabType="settings" onSideTabClick={props.onSideTabClick} isRouteTreeView={props.isRouteTreeView}/>
    </div>
  )
}

SideTabsMenu.propTypes = {
  onSideTabClick: PropTypes.func,
  isRouteTreeView: PropTypes.bool
}

module.exports = SideTabsMenu;
