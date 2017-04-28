/*
TODO: add hovering arrow between the returned report div.
*/
import React, { Component } from 'react';

class Report extends Component {
  render() {
    let report = this.props.userReports.map((element, index) => {
      //facilitate pulling information off of req and res object
      let reqObj = element['req'];
      let resObj = element['res'];
      //console.log("element in the loop", element)
      //information we want off of each timeline object

      return <div key={index} className="report">
        <div className="currentState">
          <h3> State #{index + 1} </h3> <hr />
          <b>request:</b> <br />
          cookie: {reqObj.socket._httpMessage._headers['set-cookie']} <br />
          host: {reqObj.headers.host} <br />
          complete: {reqObj.complete.toString()} <br />

          <br />

          <b>response:</b> <br />
          finished: {resObj.finished.toString()} <br />
          <br />
        </div>
        {/*below are information for arrows*/}
        <div className="stateChanges state-container">
          <div className = "arrow state-item">
            <img src = "http://placekitten.com/g/175/175" />
          </div>
          <div className="changeLogs state-item">
            <b>State Changes:</b> <br />
            {/*duration: {this.props.stateChangeLogs[0].duration} ms<br />*/}
            Request Summaries: {this.props.requestSummaries(this.props.stateChangeLogs)} <br />
            Response Summaries: {this.props.responseSummaries(this.props.stateChangeLogs)} <br />
          </div>
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