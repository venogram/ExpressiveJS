import React, { Component } from 'react';

class Report extends Component {
  render() {
    //this.props.userReports === timeline array
    //console.log(this.props.userReports)
    let report = this.props.userReports.map((element, index) => {
      // console.log(element[0])
      return element.map(el => {
        if (typeof el === "object") {
          for (let key in el) {
            // console.log("key", key)
            // console.log("el: ", el[key])
            return key + ': ' + el[key]
          }
          return el
        }
      })
    })

    console.log(report)

    return (
      <div className="report">
        <p>i am from report.js</p>
        <p>{report}</p>
      </div>
    );
  }
}

export default Report;