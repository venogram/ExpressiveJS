import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jsonInterface from './../js/jsonInterface.js';
import interpreter from './../js/changeInterpreter.js';

function ChangeDetails(props) {
  let highlights = jsonInterface.getChangeHighlights(props.details);
  highlights = highlights.map(diffObj => <li className="highlight">{interpreter(diffObj)}</li>)
  if (!highlights.length) highlights.push(<li>No highlights to display</li>);

  return (
    <div className="Details ChangeDetails">
      <p className = "DetailsTitle"> State Changes </p>
      <ul>
        {highlights}
      </ul>
    </div>
  )
}

ChangeDetails.propTypes = {
  details: PropTypes.array
}

module.exports = ChangeDetails;
