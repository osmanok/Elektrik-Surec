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
      openIssues: [],
      closeIssues: [],
    }
  }

  componentDidMount(){
    const previousOpenIssues = this.state.openIssues;

    // DataSnapshot
    firebase.database().ref('issues/').orderByChild('issueStatus').equalTo(false).on('child_added', snap => {
      previousOpenIssues.push({
        issueID: snap.val().issueID,
        issue: snap.val().issue,
        issueHeader: snap.val().issueHeader,
        issueDate: snap.val().issueDate,
        issueMachineId: snap.val().issueMachineId,
        issueCreator: snap.val().issueCreator,
        issueStatus: snap.val().issueStatus,
      })

      previousOpenIssues.reverse();

      this.setState({
        openIssues: previousOpenIssues
      })

    })

    const previousCloseIssues = this.state.closeIssues;

    firebase.database().ref('issues/').orderByChild('issueStatus').equalTo(true).on('child_added', snap => {
      previousCloseIssues.push({
        issueID: snap.val().issueID,
        issue: snap.val().issue,
        issueHeader: snap.val().issueHeader,
        issueDate: snap.val().issueDate,
        issueMachineId: snap.val().issueMachineId,
        issueCreator: snap.val().issueCreator,
        issueStatus: snap.val().issueStatus,
      })

      previousCloseIssues.reverse();

      this.setState({
        closeIssues: previousCloseIssues
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


  render(){
    return(
      <div>
        <div style={issueStyle} className="row">
        
        {
          this.state.openIssues.map((issues) => {
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
        <div className="row">
        
        {
          this.state.closeIssues.map((issues) => {
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
    )
  }
}

export default withRouter(Issues);
