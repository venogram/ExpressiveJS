import React, { Component } from 'react';

class SnapshotDetail extends Component {
  render() {
    console.log('user report from snapshot: ', this.props.userReports)
    //object which contains the object with all the details
    let details;

    if (Object.keys(this.props.details).length === 0) {
      details = undefined;
    } else {
      details = Object.keys(this.props.details).map((element, index) => {
        return <span key={index}>{element}: {this.props.details[element]} <br /> </span>
      })
    }

    // details = this.props.userReports.map((element, index) => {
    //   return <span className="snapshot" key={index}> blah blah <br /></span>
    // })

    return (
      <div className="snapshotDetails">
        {details}
      </div>
    );
  }
}

export default SnapshotDetail;