import React, { Component } from 'react';
import Report from './report';

class Route extends Component {

  render() {
    //this is an array of userRoutes
    //console.log(this.props.userRoutes)

    //console.log(this.props.displayReport)
    let methodRouteButtons = this.props.userRoutes.map((element, index) => {
      return <button key={index} onClick={() => this.props.displayReport(element)}> {element} </button>
    });

    return (
      <div className="route flex-item">
        {/*<p>i am from route.js</p>*/}
        {methodRouteButtons}
        {/*<Report watchData={this.props.watchData} userRoutes={this.props.userRoutes} userReports={this.props.userReports} />*/}
      </div>
    );
  }
}

export default Route;