import React, { Component } from 'react';

class Report extends Component {
  render() {
    //render tabs into the tab div
    let tabs = this.props.openTabs.map((element, index) => {
      return <button key={index} id={index} className={"tabs " + this.props.selected[index]} onClick={() => {this.props.displayReportFromTabs(element); this.props.highlightTab(index)}}>{element}</button>
    });

    //generate report based on userReports
    let report = this.props.userReports.map((element, index) => {
      //access req and res object
      let reqObj = element['req'];
      let resObj = element['res'];

      return <div key={index} className="report">
        <div className="currentState">
          <h2> State #{index + 1} </h2> <hr />
          <b>request:</b> <br />
          <span>cookie:</span> {reqObj.headers.cookie} <br />
          host: {reqObj.headers.host} <br />
          complete: {reqObj.complete.toString()} <br />

          <br />

          <b>response:</b> <br />
          cookie: {resObj._headers['set-cookie']} <br />
          finished: {resObj.finished.toString()} <br />
          <br />
        </div>
        {/*state change information*/}
        <div className="stateChanges state-container">
          <div className = "arrow state-item">
            <img src = "http://placekitten.com/g/175/175" />
          </div>
          <div className="changeLogs state-item">
            <b>State Changes:</b> <br />
            duration of Request and Response: {this.props.json[this.props.currTab].duration} ms<br />
            Status Code: {this.props.json[this.props.currTab].statusCode}<br />
            Status Message: {this.props.json[this.props.currTab].statusMessage}<br />
            Request Summaries: {this.props.requestSummaries(this.props.stateChangeLogs)} <br />
            Response Summaries: {this.props.responseSummaries(this.props.stateChangeLogs)} <br />
          </div>
        </div>

        <br />
      </div>
    });

    return (
      <div id="reportColumn" className="flex-item">
        <div id="tabsMenu">{tabs}</div>
        {report}
      </div>
    );
  }
}

export default Report;