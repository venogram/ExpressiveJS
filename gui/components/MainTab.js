import React, { Component } from 'react';
import PropTypes from 'prop-types';

function MainTab(props) {
  const method = props.routeId.split(' ')[0].slice(0,1) + props.routeId.split(' ')[0].slice(1).toLowerCase();
  let classString = 'MainTab'
  classString += (props.routeId === props.activeTab ? ' activeMainTab' : ' inactiveMainTab');

  function escapeTab(e) {
    e.stopPropagation();
    props.escapeTab(props.routeId);
  }

  return (
    <div className={classString} onClick={() => {props.onMainTabClick(props.routeId)}}>
      <img className="tab-logo" src="./images/whiteTabLogo.png" />
      {props.routeId}
      <div className="escape-tab-container">
        <div className="escape-tab" onClick={escapeTab}>x</div>
      </div>
    </div>
  )
}

MainTab.propTypes = {
  routeId: PropTypes.string,
  activeTab: PropTypes.string
}

module.exports = MainTab;
