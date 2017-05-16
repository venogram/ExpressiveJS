import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jsonInterface from './../js/jsonInterface.js';

function ResDetails(props) {
  let highlightObj = jsonInterface.getResponseHighlights(props.details);
  const highlights = Object.keys(highlightObj).map(key => <li>{`${key}: ${JSON.stringify(highlightObj[key], null, '  ')}`}</li>)

  return (
    <div className="Details ResDetails">
      <ul>
        {highlights}
      </ul>
    </div>
  )
}

ResDetails.propTypes = {
  details: PropTypes.object
}

module.exports = ResDetails;
