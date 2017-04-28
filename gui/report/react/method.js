import React, { Component } from 'react';
import Route from './Route';

class Method extends Component {
  render() {
    let userMethods = {};

    let allRoutes = Object.keys(this.props.json).filter(element => {
      return element !== "routes" && element !== 'currentRoute'
    })

    //gather all route methods with no repeats of same method
    allRoutes.map((element) => {
      if (!userMethods.hasOwnProperty(this.props.json[element]['method'])) {
        //console.log(this.props.json[element]['method'])
        userMethods[this.props.json[element]['method']] = this.props.json[element]['method'];
      }
    })

    //create method button
    let methodButtons = Object.keys(userMethods)
      .map((element, index) => {
        //element is GET and POST for our example.
        return <p key={index} id={element} onClick={() => this.props.displayRoute(allRoutes, element)}>{element}</p>
        //if method matches, render both p tags and Route

        //else render only p tag
      });

    return (
      <div id="methodColumn" className="flex-item">
        {methodButtons}
        <Route json={this.props.json} userRoutes={this.props.userRoutes} userReports={this.props.userReports}
          currMethod={this.props.currMethod}
          displayRoute={this.props.displayRoute} displayReport={this.props.displayReport} />
      </div>
    );
  }
}

export default Method;