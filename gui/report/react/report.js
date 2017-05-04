import React, { Component } from 'react';
import MethodAndRouteTabs from './methodAndRouteTabs'

class Report extends Component {
  render() {
    //generate report based on userReports
    let report = this.props.userReports.map((element, index) => {
      //access req,res object, and redirect Object (if any)
      let reqObj = element['req'];
      let resObj = element['res'];
      let redirectObj = this.props.json[this.props.currTab];

      //get name of all middlewares
      let totalRedirect = reqObj.route.stack.map((element, index, array) => {
        if (index !== array.length - 1) return element.name + ' -> ';
        return element.name;
      });

      //function will get duration and status code of redirect if route has redirect
      let redirectDurationAndStatusCode = (redirectObj) => {
        if (!redirectObj.redirect) return 'No Redirects';
        else return redirectObj.redirect.duration + ' ms/' + redirectObj.redirect.statusCode;
      };

      return <div key={index} className="report">
        <div className="currentState">
          <h2> State #{index + 1} </h2> <hr />
          <b>request:</b> <br />
          <span>Cookie:</span> {reqObj.headers.cookie} <br />
          Host: {reqObj.headers.host} <br />
          Middleware Stack: {totalRedirect} <br />
          Redirect Duration/Status Code: {redirectDurationAndStatusCode(redirectObj)} <br />

          Complete: {reqObj.complete.toString()} <br />

          <br />

          <b>response:</b> <br />
          cookie: {resObj._headers['set-cookie']} <br />
          Status Code: {resObj.statusCode} <br />
          Redirected location: {resObj._headers.location} <br />
          finished: {resObj.finished.toString()} <br />
          <br />
        </div>
        {/*state change information*/}
        <div className="stateChanges state-container">
          <div className="arrow state-item">
            <img src="./../arrow.png" />
          </div>
          <div className="changeLogs state-item">
            <b>State Changes:</b> <br />
            duration of Request and Response: {this.props.json[this.props.currTab].duration} ms<br />
            Request Summaries: {this.props.requestSummaries(this.props.stateChangeLogs)} <br />
            Response Summaries: {this.props.responseSummaries(this.props.stateChangeLogs)} <br />
          </div>
        </div>

        <br />
      </div>
    });

    return (
      <div className='reportColumn' >

        <MethodAndRouteTabs displayReport={this.displayReport} displayReportFromTabs={this.props.displayReportFromTabs}
          openTabs={this.props.openTabs} currTab={this.props.currTab} closeTab={this.props.closeTab} />

        <div id="reportSummary" className="flex-item">
          <div id="toggleView">..</div>
          {report}
        </div>

      </div>
    );
  }
}

export default Report;