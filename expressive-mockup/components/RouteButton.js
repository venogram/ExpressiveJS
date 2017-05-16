import React, { Component } from 'react';
import PropTypes from 'prop-types';

function RouteButton(props) {
  const routeId = props.method + ' ' + props.route;

  return (
    <button className="RouteButton" onClick={() => {props.onRouteButtonClick(routeId)}}>
      {props.route}
    </button>
  )
}

RouteButton.propTypes = {
  method: PropTypes.string,
  route: PropTypes.string,
  onRouteButtonClick: PropTypes.func
}

module.exports = RouteButton;
