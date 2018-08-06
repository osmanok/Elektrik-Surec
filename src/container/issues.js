import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

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
            return (
              <div id="issue-list-container" className="container">
                <div id="issue-list" className="col-9">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <div className="row">
                        <Link
                        to={`/issues/${issue.issueID}`}
                        id="issue-list-item"
                        issueID={issue.issueID}
                        >
                          deneme link 
                        </Link>
                        <div>
                          {issue.issueHeader}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }
}

export default withRouter(Issues);
