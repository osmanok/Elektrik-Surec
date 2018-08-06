import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import './issues.css';

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
        issueCreator: snap.val().issueCreator,
        issueStatus: snap.val().issueStatus,
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
          this.state.issues.map((issues) => {
            return (
              <div id="issue-list-container" className="container">
                <div id="issue-list" className="col-9">
                  <ul className="list-group">
                    <li className="list-group-item issue-list-item">
                      <Link to={{
                        pathname: `/issues/${issues.issueID}`,
                        state: { issues }}}
                        id="issue-list-item-link"
                      >
                        <div className="row">
                          <div id="statusBtn" className="col-2">
                            <button type="button" className="btn btn-danger ">Cozulmedi</button>
                          </div>
                          <div className="col-6 text-dark">
                            <h2>{issues.issueHeader}</h2>
                            <h6>{issues.issueCreator} tarafindan olusturuldu</h6>
                          </div>
                          <div className="col-4">
                            <h6><span className="text-dark">Makine No: </span><span className="text-danger">{issues.issueMachineId}</span></h6>
                            <div className="mt-4">
                              <small className="text-dark pt-5">{issues.issueDate}</small>
                            </div>
                          </div>
                        </div>
                      </Link>
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
