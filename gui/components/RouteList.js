import React, { Component } from 'react';
import RouteButton from './RouteButton.js';
import PropTypes from 'prop-types';

function RouteList(props) {
  const routeButtons = props.routeList.map((route, i) => <RouteButton method={props.method} route={route} onRouteButtonClick={props.onRouteButtonClick} key={i}/>)
  const classString = props.isOpen ? 'RouteList openRouteList' : 'RouteList closedRouteList';

  return (
    <div className={classString}>
      {routeButtons}
    </div>
  )
}

RouteList.propTypes = {
  method: PropTypes.string,
  isOpen: PropTypes.bool,
  routeList: PropTypes.array,
  onRouteButtonClick: PropTypes.func
}

module.exports = RouteList;
