import React, { Component } from 'react';
import Report from './report';

class Route extends Component {
  render() {
    //this is an array of userRoutes
    //console.log(this.props.userRoutes)

    //console.log(this.props.displayReport)
    let methodRouteButtons = this.props.userRoutes.map((element, index) => {
      return <span key={index}> <button className ="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" key={index} onClick={() => this.props.displayReport(element)}> {element} </button> <br /> <br /></span>
    });

    return (
      <div className="route flex-item">
        {methodRouteButtons}
      </div>
    );
  }
}

export default Route;