import React, { Component } from 'react';
import MethodAndRouteTabs from './methodAndRouteTabs';
import SnapshotDetail from './snapshotDetail';

class Report extends Component {
  render() {
    //generate report based on userReports (which is our timeline)
    let snapshot = this.props.userReports.map((element, index, array) => {
      if (index === array.length - 1) {
        return <div key={index}>
          <div className="snapshot" id={index}>
            <span>{this.props.currTab}</span> <br />
            <span>{Object.keys(element)}</span> <br /><br />

            <span> Status Code: {element[Object.keys(element)[0]].statusCode} </span> <br />

            {/*should have onClick to show component with more information on respective click*/}
            <span className='objButton' onClick={()=> this.props.detailedRequestSnapshot(index)}>request state</span> <br />
            <span className='objButton' onClick={()=> this.props.detailedResponseSnapshot(index)}>response state</span> <br />
            <span className = 'objButton'> CHANGES </span>
          </div>
        </div>
      }

      return <div key={index}>
        <div className="snapshot" id={index}>
          <span>{this.props.currTab}</span> <br />
          <span>{Object.keys(element)}</span> <br /><br />

          <span> Status Code: {element[Object.keys(element)[0]].statusCode} </span> <br />

          {/*should have onClick to show component with more information on respective click*/}
          <span className='objButton' onClick={()=> this.props.detailedRequestSnapshot(index)}>request state</span> <br />
          <span className='objButton' onClick={()=> this.props.detailedResponseSnapshot(index)}>response state</span> <br />
          <span className = 'objButton' >CHANGES </span>
        </div>
        <img className="chain" src="./../public/images/yellowLine.png" />
      </div>
    });

    return (
      <div className='reportColumn' >

        <MethodAndRouteTabs displayReport={this.props.displayReport}
          openTabs={this.props.openTabs} currTab={this.props.currTab} closeTab={this.props.closeTab} initAndHighlightTab={this.props.initAndHighlightTab} />
        <div id="reportSummary" className="flex-item">
          <div id="toggleView">...</div> {/* going to becoming a react component */}
          <div id="snapshotChain">
            {snapshot}
          {<SnapshotDetail currTab={this.props.currTab} userReports={this.props.userReports} details={this.props.details}
            detailedRequestSnapshot={this.props.detailedRequestSnapshot} detailedResponseSnapshot={this.detailedResponseSnapshot}/>}
          </div>


        </div>

      </div>
    );
  }
}

export default Report;