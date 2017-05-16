import React, { Component } from 'react';
import ReportLine from './ReportLine.js';
import PropTypes from 'prop-types';

function Report(props) {
  //detailsDisplay={}
  let reportView;
  if(!props.reportState) reportView = <img id="grayLogo" src="./../images/grayEXPRLogo.png"/>;
  else reportView = props.reportState.reportLines.map((line, i) => <ReportLine line={line} eventHandlers={props.eventHandlers} lineNum={i} key={i} />);

  return (
    <div id="Report">
      {reportView}
    </div>
  )
}

Report.propTypes = {
  reportState: PropTypes.object,
  eventHandlers:PropTypes.object
}

module.exports = Report;
