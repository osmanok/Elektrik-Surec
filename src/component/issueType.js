import React, { Component } from 'react';
import './issueType.css';

class IssueType extends Component{

    constructor(props){
        super(props);
        this.issue = props.issue;
        this.issueHeader = props.issueHeader;
        this.issueDate = props.issueDate;
        this.issueMachineId = props.issueMachineId;
        this.issueCreator = props.issueCreator;
        this.issueID = props.issueID
    }


    render(){
        return(
            <div id="issue-list-container" className="container">
              <div id="issue-list" className="col-9">
                <ul className="list-group">
                  <li className="list-group-item">
                    <div className="row">
                      <a  href="#" id="issue-list-item" className="col-12">
                        <div className="row">
                          <div id="statusBtn" className="col-2">
                            <button type="button" className="btn btn-danger ">Cozulmedi</button>
                          </div>
                          <div className="col-10">
                            <h4>{this.issueHeader}</h4>
                            <h6>{this.issue}</h6>
                            <div className="row">
                              <div className="col-4">
                                <h6><strong>Makine No: </strong>{this.issueMachineId}</h6>
                              </div>
                              <div className="col-4">
                                <h6><strong>Olusturan: </strong>{this.issueCreator}</h6>
                              </div>
                              <div className="col-4">
                                <h6><small>{this.issueDate}</small></h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
        )
    }
}

export default IssueType;
