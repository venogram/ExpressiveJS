import React, { Component } from 'react';
import MethodAndRouteTabs from './methodAndRouteTabs';

class AllSnapshots extends Component {
  render() {

    //generate report based on userReports (which is our timeline)
    let snapshot = this.props.userReports.map((element, index, array) => {
      //access req,res object, and redirect Object (if any)
      let reqObj = element['req'];
      let resObj = element['res'];

      if(index === array.length - 1) {
        return <div key={index}>
      <div className="snapshot">
        <span className="">{this.props.currTab}</span> <br />
        <span className="">{element['prevFunc']}</span> <br /><br />
        {/*should have onClick to show component with more information on respective click*/}
        <span>request state</span> <br />
        <span>response state</span>
      </div>

      </div>
      }

      return <div key={index}>
      <div className="snapshot">
        <span>{this.props.currTab}</span> <br />
        <span>{element.prevFunc}</span> <br /><br />
        {/*should have onClick to show component with more information on respective click*/}
        <span>request state</span> <br />
        <span>response state</span>
      </div>
        <img className="chain" src="./../public/images/yellowLine.png" />
      </div>
    });

    return (
      <div className='reportColumn' >

        <MethodAndRouteTabs displayReport={this.displayReport} displayReportFromTabs={this.props.displayReportFromTabs}
          openTabs={this.props.openTabs} currTab={this.props.currTab} closeTab={this.props.closeTab} initTab={this.props.initTab}/>

        <div id="reportSummary" className="flex-item">
          <div id="toggleView">...</div> {/* going to becoming a react component */}
          <div id="snapshotChain">
            {snapshot}
          </div>
        </div>

      </div>
    );
  }
}

export default AllSnapshots;