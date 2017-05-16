import React, { Component } from 'react';
import PropTypes from 'prop-types';

function SideTab(props) {
  const innerHTML = props.tabType === 'settings' ? 'Settings' : <img id="ExpressiveLogo" src="./images/whiteEXPRLogo.png"/>
  const classString = 'SideTab ' + ((props.tabType === 'expressive') === props.isRouteTreeView ? 'activeSideTab' : 'inactiveSideTab');
  return (
    <div className={classString} onClick={() => {props.onSideTabClick(props.tabType)}}>
      {innerHTML}
    </div>
  )
}

SideTab.propTypes = {
  tabType: PropTypes.string,
  isRouteTreeView: PropTypes.bool
}

module.exports = SideTab;
