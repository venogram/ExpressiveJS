import React, { Component } from 'react';
import MethodAndRouteTabs from './methodAndRouteTabs';
import SnapshotDetail from './snapshotDetail';

class Report extends Component {
  render() {

    //generate report based on userReports (which is our timeline)
    let snapshot = this.props.userReports.map((element, index, array) => {
      console.log(element)
      //access req,res object
      let reqObj = element['req'];
      let resObj = element['res'];

      if (index === array.length - 1) {
        return <div key={index}>
          <div className="snapshot" id={index}>
            <span className="">{this.props.currTab}</span> <br />
            <span className="">{element['prevFunc']}</span> <br /><br />
            {/*should have onClick to show component with more information on respective click*/}
            <span onClick={()=> this.props.detailedRequestSnapshot(index)}>request state</span> <br />
            <span onClick={()=> this.props.detailedResponseSnapshot(index)}>response state</span>
          </div>
        </div>
      }

      return <div key={index}>
        <div className="snapshot" id={index}>
          <span>{this.props.currTab}</span> <br />
          <span>{element.prevFunc}</span> <br /><br />
          {/*should have onClick to show component with more information on respective click*/}
          <span onClick={()=> this.props.detailedRequestSnapshot(index)}>request state</span> <br />
          <span onClick={()=> this.props.detailedResponseSnapshot(index)}>response state</span>
        </div>
        <img className="chain" src="./../public/images/yellowLine.png" />
      </div>
    });

    return (
      <div className='reportColumn' >

        <MethodAndRouteTabs displayReport={this.displayReport} displayReportFromTabs={this.props.displayReportFromTabs}
          openTabs={this.props.openTabs} currTab={this.props.currTab} closeTab={this.props.closeTab} initAndHighlightTab={this.props.initAndHighlightTab} />

        <div id="reportSummary" className="flex-item">

          <div id="toggleView">...</div> {/* going to becoming a react component */}

          <div id="snapshotChain">
            {snapshot}
          </div>

          <SnapshotDetail currTab={this.props.currTab} userReports={this.props.userReports} details={this.props.details}
            detailedRequestSnapshot={this.props.detailedRequestSnapshot} detailedResponseSnapshot={this.detailedResponseSnapshot}/>

        </div>

      </div>
    );
  }
}

export default Report;