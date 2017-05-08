import React, { Component } from 'react';

class Route extends Component {
  render() {
    //generate route buttons that will show report on click
    let methodRouteButtons = this.props.userRoutes.map((element, index) => {
      let methodAndRoute = this.props.currMethod + ' ' + element;
      return <p key={index} className="indent hover" onClick={() => {this.props.displayReport(methodAndRoute); this.props.initAndHighlightTab(methodAndRoute)}}> {element} </p>
    });

    return (
      <div className="routes">
        {methodRouteButtons}
      </div>
    );
  }
}

export default Route;