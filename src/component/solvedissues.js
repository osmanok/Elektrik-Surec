import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import '../container/issues.css';

const issueStyle = {
  marginTop: '100px',
}

class SolvedIssues extends Component {
  constructor(props){
    super(props);
    this.state = {
      issues: [],
    }
  }

  componentDidMount(){
    const previousIssues = this.state.issues;

    firebase.database().ref('issues/').orderByChild('issueStatus').equalTo(true).on('child_added', snap => {
      previousIssues.push({
        issueID: snap.val().issueID,
        issue: snap.val().issue,
        issueHeader: snap.val().issueHeader,
        issueDate: snap.val().issueDate,
        issueMachineId: snap.val().issueMachineId,
        issueCreator: snap.val().issueCreator,
        issueStatus: snap.val().issueStatus,
      })

      previousIssues.reverse();

      this.setState({
        issues: previousIssues
      })
    })
  }

  statusBtn(issueID){
    if(issueID){
      return(
        <div>
          <button className="btn btn-success btn-lg">
            Cozuldu
          </button>
        </div>
      );
    }
    else{
      return(
        <div>
          <button className="btn btn-danger btn-lg">
            Cozulmedi
          </button>
        </div>
      );
    }
  }


  render() {
    return (
      <div>
        <div className="container">
          <h1 className="mx-auto">Cozulen Arizalar</h1>
        </div>
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
                            {this.statusBtn(issues.issueStatus)}
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
    );
  }
}

export default SolvedIssues;