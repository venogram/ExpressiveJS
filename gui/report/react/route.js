import React, { Component } from 'react';

class Route extends Component {
  render() {
    //generate route buttons that will show report on click
    let methodRouteButtons = this.props.userRoutes.map((element, index) => {
      return <p key={index} className="indent hover" onClick={() => {this.props.displayReport(element); this.props.initTab(element)}}> {this.props.json[element].route} </p>
    });

    return (
      <div className="routes">
        {methodRouteButtons}
      </div>
    );
  }
}

export default Route;