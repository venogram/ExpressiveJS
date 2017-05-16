import React, { Component } from 'react';
import SideTabsMenu from './SideTabsMenu.js';
import RouteTree from './RouteTree.js';
import Settings from './Settings.js';
import PropTypes from 'prop-types';

function getInitialState() {
  return {
    viewSettings: false
  }
}

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();
  }


  render() {
    const routeTreeEventHandlers = {
      onMethodButtonClick: this.props.eventHandlers.onMethodButtonClick,
      onRouteButtonClick: this.props.eventHandlers.onRouteButtonClick
    }

    const RouteTreeView = <RouteTree eventHandlers={routeTreeEventHandlers} methodDisplayInfo={this.props.forRouteTree}/>;
    const SettingsView = <Settings />;
    const view = this.props.isRouteTreeView ? RouteTreeView : SettingsView;

    return (
      <div id="Sidebar">
        <SideTabsMenu onSideTabClick={this.props.eventHandlers.onSideTabClick} isRouteTreeView={this.props.isRouteTreeView}/>
        {view}
      </div>
    )
  }
}

Sidebar.propTypes = {
  isRouteTreeView: PropTypes.bool,
  eventHandlers: PropTypes.object,
  forRouteTree: PropTypes.object
}

module.exports = Sidebar;
