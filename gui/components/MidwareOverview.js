import React, { Component } from 'react';
import PropTypes from 'prop-types';

function MidwareOverview(props) {
  let overview = props.overview;
  let classString = 'MidwareOverview';

  const routeId = overview.method + ' ' + overview.originalUrl;
  const midwareId = overview.prevFuncName;
  const status = overview.statusMessage ? overview.statusCode + ': ' + overview.statusMessage : overview.statusCode;

  const detailButtons = !props.lineNum || props.overview.isRedirect ?
    (
      <div className="overview-bottom">
        <div className = 'overviewDeets' onClick={()=>{props.eventHandlers.toggleResDeets(props.lineNum)}}> Response Details </div>
        <div className = 'overviewDeets' onClick={()=>{props.eventHandlers.toggleReqDeets(props.lineNum)}}> Request Details </div>
      </div>
    ) :
    (
      <div className="overview-bottom">
        <div className = 'overviewDeets' onClick={()=>{props.eventHandlers.toggleChangeDeets(props.lineNum)}}> State Changes </div>
        <div className = 'overviewDeets' onClick={()=>{props.eventHandlers.toggleResDeets(props.lineNum)}}> Response Details </div>
        <div className = 'overviewDeets' onClick={()=>{props.eventHandlers.toggleReqDeets(props.lineNum)}}> Request Details </div>
      </div>
    );


  // conditionally render State Changes Button (conditions: isRedirect or is the first reportLine)

  return (
    <div className={classString}>
      <div className="overview-top">
        <div className="overview-statement">{routeId}</div>
        <div className="overview-statement">{midwareId}</div>
        <div className="overview-statement">{status}</div>
      </div>
      {detailButtons}
    </div>
  )
}

MidwareOverview.propTypes = {
  overview: PropTypes.object,
  eventHandlers: PropTypes.object,
  lineNum:  PropTypes.number
}

module.exports = MidwareOverview;
