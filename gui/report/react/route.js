import React, { Component } from 'react';
import Report from './Report';

class Route extends Component {
  render() {
    let methodRouteButtons = this.props.userRoutes.map((element, index) => {
      //console.log("element from route.js", element)
      return <p key={index} className="indent" onClick={() => this.props.displayReport(element)}> {element} </p>
    });

    return (
      <div >
        {methodRouteButtons}
      </div>
    );
  }
}

export default Route;