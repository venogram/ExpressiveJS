import React, { Component } from 'react';

class SnapshotDetail extends Component {
  render() {
    //console.log('user report from snapshot: ', this.props.userReports)
    //object which contains the object with all the details
    // let myDetails = <h1>"blue" </h1>

    // if (Object.keys(this.props.details).length === 0) {
    //   details = undefined;
    // // } else {
    //   let details = Object.keys(this.props.details).map((element, index) => {
    //     return <span key={index}>{element}: {this.props.details[element]} <br /> </span>
    //   });
    

    let keysOfDetails = Object.keys(this.props.details)
    let displayArr = []
    let element= [];
    for(let i = 0; i < keysOfDetails.length; i++){
      if(this.props.details[i] === undefined) element.push(<span className= 'snapshots'></span>)
      else if(this.props.details[i]["complete"] !== undefined){
        element.push(<p>complete: {this.props.details[i]["complete"]}</p>);
        element.push(<p>socket destroyed: {this.props.details[i]["socketDestroyed"]}</p>);
        displayArr.push(<span> {element} </span>)        
      }else if(this.props.details[i]["finished"]){
        let finished = "finished: " + this.props.details[i]["finished"]
        element.push(<p>{finished}</p>)
        element.push(<p>Should Keep Alive: {this.props.details[i]["shouldKeepAlive"]}</p>);
      }
    }     

    return (
      <div className="snapshotDetails">
        {element}
      </div>
     );
   }
}

export default SnapshotDetail;