import React, { Component } from 'react';
import ToggleLineDisplay from './ToggleLineDisplay.js';
import MidwareOverview from './MidwareOverview.js';
import ReqDetails from './ReqDetails.js';
import ResDetails from './ResDetails.js';
import ChangeDetails from './ChangeDetails.js';
import PropTypes from 'prop-types';

function ReportLine(props) {

  let line = props.line;
  let detailsDisplay = props.line.detailsDisplay;
  let detailsJsx;
  if (detailsDisplay === 'res') detailsJsx = <ResDetails details={line.res}/>;
  else if (detailsDisplay === 'req') detailsJsx = <ReqDetails details={line.req}/>;
  else if (detailsDisplay === 'change') detailsJsx = <ChangeDetails details={line.change}/>;
  else detailsJsx = null;


  const overviewEventHandlers ={
    toggleResDeets: props.eventHandlers.toggleResDeets,
    toggleReqDeets: props.eventHandlers.toggleReqDeets,
    toggleChangeDeets: props.eventHandlers.toggleChangeDeets
  }

  const lineDisplayEventHandlers = {
    toggleReportLine: props.eventHandlers.toggleReportLine
  }

  return (
    <div className="ReportLine">
      <ToggleLineDisplay eventHandlers = {lineDisplayEventHandlers} lineNum = {props.lineNum} line  = {props.line}/>
      <MidwareOverview overview={props.line.overview} eventHandlers={overviewEventHandlers} lineNum={props.lineNum}/>
      {detailsJsx}
    </div>
  )
}

ReportLine.propTypes = {
  line: PropTypes.object,
  lineNum: PropTypes.number,
  eventHandlers: PropTypes.object,
  detailsDisplay: PropTypes.string
}

module.exports = ReportLine;
