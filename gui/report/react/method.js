import React, { Component } from 'react';
import Route from './route';

class Method extends Component {

  render() {

    let userMethods = {};
    //gather all route methods with no repeats of same method
    Object.keys(this.props.watchData).map((element) => {
      if(!userMethods.hasOwnProperty(this.props.watchData[element]['method'])) {
        userMethods[this.props.watchData[element]['method']] = this.props.watchData[element]['method']
      }
    })
    //create method button
    let methodButtons = Object.keys(userMethods)
    .map((element, index) => {
      return <span key={index}><button key={index} id={element} onClick={() => this.props.displayRoute(element)}> {element} </button><br/></span>
    });

    //let test = document.getElementById('GET')

    return (
      <div className="method">
        {methodButtons}
        <Route watchData={this.props.watchData} userRoutes={this.props.userRoutes} userReports={this.props.userReports}
        displayRoute={this.props.displayRoute} displayReport={this.props.displayReport} />
      </div>
    );
  }
}

export default Method;