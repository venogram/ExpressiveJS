import React, { Component } from 'react';
import Report from './report';

class Route extends Component {
  // constructor(props) {
  //   super(props)
  // }
  render() {
    //this is an array of userRoutes
    //console.log(this.props.userRoutes)

    //console.log(this.props.displayReport)
    let methodRouteButtons = this.props.userRoutes.map((element, index, arr) => {
      return <span key={index}><button key={index} onClick={() => this.props.displayReport(element)}> {element} </button><br/></span>
    });

    return (
      <div className="route">
        <p>i am from route.js</p>
        {methodRouteButtons}
        <Report watchData={this.props.watchData} userRoutes={this.props.userRoutes} userReports={this.props.userReports} />
      </div>
    );
  }
}

export default Route;