import React, { Component } from 'react';
import PropTypes from 'prop-types';

function ToggleLineDisplay(props) {

  return (
    <div className="ToggleLineDisplay" onClick = {()=> {props.eventHandlers.toggleReportLine(props.lineNum)}}>

    </div>
  )
}

ToggleLineDisplay.propTypes = {
  line: PropTypes.object,
  eventHandlers: PropTypes.object,
  lineNum : PropTypes.number
}
module.exports = ToggleLineDisplay;
