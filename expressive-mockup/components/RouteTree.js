import React, { Component } from 'react';
import HttpMethodDisplay from './HttpMethodDisplay.js';
import PropTypes from 'prop-types';

function RouteTree(props) {

  const httpMethods = props.methodDisplayInfo.routeIds.reduce((httpMethods, routeId) => {
    let method = routeId.split(' ')[0];
    if (!httpMethods.includes(method)) httpMethods.push(method);
    return httpMethods;
  }, []);

  const openMethodButtons = props.methodDisplayInfo.openMethodButtons;

  const methodDisplays = httpMethods.map((method, i) => {
    const routeList = props.methodDisplayInfo.routeIds.filter(routeId => routeId.split(' ')[0] === method);
    const isOpen = openMethodButtons.includes(method);
    return <HttpMethodDisplay method={method} isOpen={isOpen} routeList={routeList} eventHandlers={props.eventHandlers} key={i}/>
  });

  return (
    <div id="RouteTree">
      {methodDisplays}
    </div>
  )
}

RouteTree.propTypes = {
  eventHandlers: PropTypes.object,
  methodDisplayInfo: PropTypes.object
}

module.exports = RouteTree;
