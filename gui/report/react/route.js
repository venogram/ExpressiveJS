import React, { Component } from 'react';
import Report from './Report';

class Route extends Component {
  render() {
    let methodRouteButtons = this.props.userRoutes.map((element, index) => {
      return <button key={index} id={index} onClick={() => this.props.displayReport(element, index)}> {element} </button>
    });

    return (
      <div id="routeColumn" className="flex-item">
        {methodRouteButtons}
      </div>
    );
  }
}

export default Route;