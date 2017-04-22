import React, { Component } from 'react';
import Report from './report';

class Route extends Component {
  render() {
    //this is an array of userRoutes
    //console.log(this.props.userRoutes)
    let methodRouteButtons = this.props.userRoutes.map((element, index) => {
    return <span key={index}><button key={index}> {element} </button><br/></span>
  });

    return (
      <div className="route">
        <p>i am from route.js</p>
        {methodRouteButtons}
        <Report watchData={this.props.watchData} userRoutes={this.props.userRoutes} />
      </div>
    );
  }
}

export default Route;