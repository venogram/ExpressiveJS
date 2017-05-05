import React, { Component } from 'react';

class SnapshotDetail extends Component {
  render() {
    //console.log("userReports from snapshot", this.props.userReports) //timeline for respective currTab
    // console.log('currentTab from snapshot', this.props.currTab) //GET /, GET /redirect
    //console.log('details from snapshot', this.props.details)

    //object which contains the object with all the details
    let details = this.props.details;
    let connection, host;
    //console.log("details: ", details)
    if(details.headers.connection) connection = details.headers.connection;
    else connection = undefined;

    if(details.headers.host) host = details.headers.host;
    else host = undefined;

    return (
      <div className={"snapshotDetails"}>
        hidden text
        {connection}
        {host}
      </div>
    );
  }
}

export default SnapshotDetail;