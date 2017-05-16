import React, { Component } from 'react';
import MethodButton from './MethodButton.js';
import RouteList from './RouteList.js';
import PropTypes from 'prop-types';

function HttpMethodDisplay(props) {
  const routeList = props.routeList.map(route => route.split(' ').slice(1).join(' '));

  return (
    <div className="HttpMethodDisplay">
      <MethodButton method={props.method} clickMe={props.eventHandlers.onMethodButtonClick} isOpen={props.isOpen}/>
      <RouteList method={props.method} routeList={routeList} isOpen={props.isOpen} onRouteButtonClick={props.eventHandlers.onRouteButtonClick}/>
    </div>
  )
}

HttpMethodDisplay.propTypes = {
  isOpen: PropTypes.bool,
  method: PropTypes.string,
  routeList: PropTypes.array,
  eventHandlers: PropTypes.object
}

module.exports = HttpMethodDisplay;
