import React, { Component } from 'react';

class Report extends Component {
  render() {
    //this.props.userReports === timeline array
    //console.log(this.props.userReports)
    let report = this.props.userReports.map((element, index) => {
        if (typeof element === "object") {
          for (let key in element) {
            //return objects inside timeline in watchDog.json
            return <p key={index}>{key + ': ' + element[key]} </p>
          }
          return element
        }
    });

    return (
      <div className="report">
        <p>i am from report.js</p>
        <div>{report}</div>
      </div>
    );
  }
}

export default Report;