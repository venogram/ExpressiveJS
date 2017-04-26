/*
TODO: put key inside <p> tag in report array
*/
import React, { Component } from 'react';
//import in getStateChange from watchDogJSONInterface.js
import JSONInterface from './../public/watchDogJSONInterface';

class Report extends Component {
  render() {
    //this.props.userReports === timeline array
    //console.log(this.props.userReports)
    let report = this.props.userReports.map((element, index) => {
      //element is an object from timeline
      //console.log("each report from timeline: ", element)

      //facilitate pulling information off of req and res object
      let reqObj = element['req'];
      let resObj = element['res'];

      //information we want off of each timeline object
      return <div key={index} className="report">
        <p><b>timestamp:</b> {element.timestamp}</p>

        <p><b>request:</b></p>
            cookie: {reqObj.headers.cookie} <br/>
            host: {reqObj.headers.host} <br/>
            complete: {reqObj.complete.toString()} <br/>

        <p><b>response:</b></p>
            finished: {resObj.finished.toString()} <br/>
          <br/>
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