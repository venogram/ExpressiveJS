import React, { Component } from 'react';
import PropTypes from 'prop-types';

function MethodButton(props) {
  const triangleClass = props.isOpen ? 'triangle-down' : 'triangle-right';

  return (
    <div>
      <div className={triangleClass}></div>
      <button className="MethodButton" onClick={() => {props.clickMe(props.method)}}>
        {props.method}
      </button>
    </div>
  )
}

MethodButton.propTypes = {
  isOpen: PropTypes.bool,
  method: PropTypes.string,
  clickMe: PropTypes.func
}



module.exports = MethodButton;
