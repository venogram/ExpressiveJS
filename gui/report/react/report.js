/*
TODO: put key inside <p> tag in report array
*/

import React, { Component } from 'react';

class Report extends Component {
  render() {
    //this.props.userReports === timeline array
    //console.log(this.props.userReports)
    let report = [];
    let filterReport = this.props.userReports.map((element, index) => {
      //element is an object
      //console.log(element)
      for (let key in element) {
        //return objects inside timeline in watchDog.json
        report.push(<p > {key + ': ' + element[key]} </p>)
      }
    });

    return (
      <div className="report flex-item">
        {report}
      </div>
    );
  }
}

export default Report;