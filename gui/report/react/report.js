import React, { Component } from 'react';

class Report extends Component {
  render() {
    //this.props.userReports === timeline array
    //console.log(this.props.userReports)
    let report = this.props.userReports.map((element, index) => {
        if (typeof element === "object") {
          for (let key in element) {
            // console.log("key", key)
            // console.log("el: ", el[key])
            return <p key={index}>{key + ': ' + element[key]}</p>
          }
          return element
        }
    });

    console.log(report)

    return (
      <div className="report">
        <p>i am from report.js</p>
        <div>{report}</div>
      </div>
    );
  }
}

export default Report;