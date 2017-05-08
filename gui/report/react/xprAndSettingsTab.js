import React, { Component } from 'react';
import Method from './Method';

class XprAndSettingsTab extends Component {

  render() {
    //create tab for xpr logo and setting
    let mainTab = this.props.xprSettingsTab.map((element, index) => {
      if(Object.keys(element)[0] === 'xpr') {
        return <button key={index} id={Object.keys(element)[0]} className={element[Object.keys(element)[0]]}
        onClick={() => this.props.toggleXprTab(Object.keys(element)[0])} >
        <img id="mainLogo" src="./../public/images/whiteEXPRLogo@2x.png"/>
      </button>
      }
      return <button key={index} id={Object.keys(element)[0]} className={element[Object.keys(element)[0]]}
        onClick={() => this.props.toggleXprTab(Object.keys(element)[0])} > {Object.keys(element)[0]}
      </button>
    })

    //conditional rendering depending on what was clicked
    let sideBar = this.props.xprSettingsTab.map((element, index) => {
      if (element[Object.keys(element)[0]] === 'xprSelected' && Object.keys(element)[0] === 'Settings') {
        return <span key={index} >
          <div id="settingsTab">setting coming soon!</div>
        </span>
      } else if (element[Object.keys(element)[0]] === 'xprSelected' && Object.keys(element)[0] === 'xpr') {
        return <span key={index} >
          <Method json={this.props.json} userRoutes={this.props.userRoutes} userReports={this.props.userReports}
            currMethod={this.props.currMethod}
            displayRoute={this.props.displayRoute} displayReport={this.props.displayReport}
            openTabs={this.props.openTabs} initAndHighlightTab={this.props.initAndHighlightTab} />
        </span>
      }
    });

    return (
      <div id="xprColumn">
        <span className="mainTab">
          {mainTab}
        </span>
        {sideBar}
      </div>
    )
  }
}

export default XprAndSettingsTab;