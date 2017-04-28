import React, { Component } from 'react';
import Report from './Report';

class Route extends Component {
  render() {
    let methodRouteButtons = this.props.userRoutes.map((element, index) => {
      return <p key={index} className="indent" id={index} onClick={() => this.props.displayReport(element, index)}> {element} </p>
    });

    return (
      <div >
        {methodRouteButtons}
      </div>
    );
  }
}

export default Route;