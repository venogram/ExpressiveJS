import React, { Component } from 'react';

class SnapshotDetail extends Component {
  render() {
    //console.log('user report from snapshot: ', this.props.userReports)
    //object which contains the object with all the details
    // let myDetails = <h1>"blue" </h1>

    // if (Object.keys(this.props.details).length === 0) {
    //   details = undefined;
    // } else {
      let details = Object.keys(this.props.details).map((element, index) => {
        console.log("snapshot elemenet: ", element, "/n snapshot index: ", index)
        return <span key={index}>{element}: {this.props.details[element]} <br /> </span>
      });

    // }

    return (
      <div className="snapshotDetails">
        {details}
      </div>
    );
  }
}

export default SnapshotDetail;