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

    console.log(Object.keys(userMethods))
    //create method button
    let methodButtons = Object.keys(userMethods)
      .map((element, index) => {
        //element is GET and POST for our example.
        return <p key={index} id={element} onClick={() => this.props.displayRoute(allRoutes, element)}>{element}</p>
      });
<<<<<<< HEAD
      console.log(methodButtons)
=======

    //add route button according the the pressed method button
    let subButtons = methodButtons.map((element, index) => {
      if(element.props.id === this.props.currMethod) {
        return  <span key={index}>
        {element}
        <Route json={this.props.json} userRoutes={this.props.userRoutes} userReports={this.props.userReports}
            currMethod={this.props.currMethod}
            displayRoute={this.props.displayRoute} displayReport={this.props.displayReport} />
        </span>
      } else {
        return element
      }
    })

>>>>>>> fc56149d77faa38a2e5902874cc930b974b93e30
    return (
      <div id="methodColumn" className="flex-item">
        {subButtons}
      </div>
    );
  }
}

export default Method;