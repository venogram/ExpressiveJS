import React, { Component } from 'react';
import Method from './method';
const watchData = require('./../../../watchDog.json');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          watchData,
          userRoutes: []
        };
        this.displayRoute = this.displayRoute.bind(this);
        this.displayReport = this.displayReport.bind(this);
    }

displayRoute(method) {
  //our method is get or post (for right now)
  let tempRoute = [];
  //clear existing state of userRoutes
  this.state.userRoutes = [];
  Object.keys(this.state.watchData).map((element) => {
    if(this.state.watchData[element]['method'] === method) {
      tempRoute.push(element)
    }
  })
  this.setState({userRoutes: this.state.userRoutes.concat(tempRoute) });
}

displayReport() {

}

  render() {
    // console.log(this.state.userRoutes)
    return (
      <div className="App">
        <p>I am from app.js</p>
        <Method watchData={this.state.watchData} userRoutes={this.state.userRoutes}
        displayRoute={this.displayRoute} displayReport={this.displayReport}/>
      </div>
    );
  }
}

export default App;
