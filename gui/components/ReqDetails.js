import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jsonInterface from './../js/jsonInterface.js';

function ReqDetails(props) {
  let highlightObj = jsonInterface.getRequestHighlights(props.details);
  const highlights = Object.keys(highlightObj).map(key => <li>{`${key}: ${JSON.stringify(highlightObj[key], null, '  ')}`}</li>)
  return (
    <div className="Details ReqDetails">
      {highlights}
    </div>
  )
}

ReqDetails.propTypes = {
  details: PropTypes.object
}

module.exports = ReqDetails;
