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
      //element is GET and POST for our example.
      return <span key={index}><button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" key={index} id={element} onClick={() => this.props.displayRoute(element)}> {element} </button> <br/> <br/></span>
    });

    return (
      <div className="method flex-item">
        {methodButtons}
      </div>
    );
  }
}

export default Method;