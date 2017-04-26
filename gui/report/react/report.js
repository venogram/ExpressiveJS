/*
TODO: add hovering arrow between the returned report div.
*/
import React, { Component } from 'react';

//import in getStateChange from watchDogJSONInterface.js
import JSONInterface from './../public/watchDogJSONInterface';

class Report extends Component {
  render() {
    //this.props.userReports === timeline array
    //console.log(this.props.userReports)
    let report = this.props.userReports.map((element, index) => {
      //facilitate pulling information off of req and res object
      let reqObj = element['req'];
      let resObj = element['res'];

      //information we want off of each timeline object
      return <div key={index} className="report">
        <p><b>timestamp:</b> {element.timestamp}</p>

        <p><b>request:</b></p>
            cookie: {reqObj.headers.cookie} <br />
            host: {reqObj.headers.host} <br />
            complete: {reqObj.complete.toString()} <br />

        <p><b>response:</b></p>
            finished: {resObj.finished.toString()} <br />
          <br/>

          {/*below are information for arrows*/}
          <div>
            <p><b>State Changes:</b></p>
            duration: {JSONInterface.getStateChanges(this.props.watchData)[0].duration} <br />
            {/*request changes: {JSONInterface.getStateChanges(this.props.watchData)[0].reqDiff} <br />*/}
            <p>Response changes: </p>
            Kind: {JSONInterface.getStateChanges(this.props.watchData)[0].resDiff['._headers.set-cookie']} <br />
            What changed?: {JSONInterface.getStateChanges(this.props.watchData)[0].resDiff['._headers.set-cookie'].DiffNew['rhs']} <br />
          </div>

          <br />
      </div>
    });

    return (
      <div id="reportColumn" className="flex-item">
        {report}
      </div>
    );
  }
}

export default Report;