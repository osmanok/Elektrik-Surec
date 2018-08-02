import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database';
import {DB_CONFIG} from './config';
import _ from 'lodash';
import IssueType from '../component/issueType';

const issueStyle = {
  marginTop: '100px',
}

class Issues extends Component {

  constructor(props){
    super(props);
    this.state = {
      issues: [],
    }
    this.database = firebase.database().ref().child('issues');

  }

  componentDidMount(){
    const previousIssues = this.state.issues;

    // DataSnapshot
    this.database.on('child_added', snap => {
      previousIssues.push({
        issueID: snap.val().issueID,
        issue: snap.val().issue,
        issueHeader: snap.val().issueHeader,
        issueDate: snap.val().issueDate,
        issueMachineId: snap.val().issueMachineId,
        issueCreator: snap.val().issueCreator
      })

      this.setState({
        issues: previousIssues
      })
    })
  }

  render(){
    return(
      <div>
        <div style={issueStyle} className="row">
        {
          this.state.issues.map((issue) => {
            console.log(issue.key)
            return (
              <IssueType
              issueID={issue.issueID}
              issueHeader={issue.issueHeader}
              issue={issue.issue}
              issueDate={issue.issueDate}
              issueMachineId={issue.issueMachineId}
              issueCreator={issue.issueCreator}
              />
            )
          })
        }
        </div>
      </div>
    )
  }
}

export default Issues;
