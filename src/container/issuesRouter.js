import React, { Component } from 'react';
import firebase from 'firebase';

class IssuesRouter extends Component {

  constructor(props){
    super(props);
    this.issueID = props.issueID;
  }

  render() {

    return (
      <div>
        <h3>Deneme</h3>
        {console.log(this.issueID)}
      </div>
    );
  }
}

export default IssuesRouter;