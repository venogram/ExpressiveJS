import React, { Component } from 'react';
import Route from './Route';

class Method extends Component {
  render() {
    let userMethods = {};

    let allRoutes = Object.keys(this.props.json).filter(element => {
      return element !== "routes" && element !== 'currentRoute' && element !== 'completedReqs'
    })

    //gather all route methods with no repeats of same method
    allRoutes.map((element) => {
      if (!userMethods.hasOwnProperty(this.props.json[element]['method'])) {
        userMethods[this.props.json[element]['method']] = this.props.json[element]['method'];
      }
    })

    //create method button
    let methodButtons = Object.keys(userMethods).map((element, index) => {
        return <div key={index} id={element} className="hover method" onClick={() => this.props.displayRoute(allRoutes, element)}>{element}</div>
      });

    //add route buttons according to the pressed method button
    let subButtons = methodButtons.map((element, index) => {
      if(element.props.id === this.props.currMethod) {
        return  <span key={index}>
        {element}
        <Route json={this.props.json} userRoutes={this.props.userRoutes} userReports={this.props.userReports}
            currMethod={this.props.currMethod}
            displayRoute={this.props.displayRoute} displayReport={this.props.displayReport} initTab={this.props.initTab}/>
        </span>
      } else {
        return element
      }
    })

    return (
      <div id="methodColumn" className="flex-item">
        {subButtons}
      </div>
    );
  }
}

export default Method;