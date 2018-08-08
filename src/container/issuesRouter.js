import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

class IssuesRouter extends Component {

  constructor(){
    super();

    this.state = {
      issueID: '',
      issueHeader: '',
      issue: '',
      issueDate: '',
      issueMachineId: '',
      issueCreator: '',
      issueStatus: '',
      issueSolutionValue: '',
      issueSolutionsValueAdder: '',
      issueSolutions: [],
    }

  }

  componentWillMount(){
    const item = this.props.history.location.state.issues
    this.setState({issueID: item.issueID})
    this.setState({issueHeader: item.issueHeader})
    this.setState({issue: item.issue})
    this.setState({issueDate: item.issueDate})
    this.setState({issueMachineId: item.issueMachineId})
    this.setState({issueCreator: item.issueCreator})
    this.setState({issueStatus: item.issueStatus})
  }
  
  statusChangeClick = () => {
    this.setState({issueStatus: true});
  }

  issueSolutionsOnChange = (e) => {
    let solutionAdderName = e.target.value
    this.setState({issueSolutionValue: solutionAdderName});
  }

  issueSolutionsValueAdderOnChange = (e) => {
    this.setState({issueSolutionsValueAdder: e.target.value})
  }

  updateStatus = (key) => {
    let dbRef = firebase.database().ref('issues'/key/'issueSolutions').child(key);
    dbRef.update({
      issueStatus: this.state.issueStatus
    })
  }

  delete = (key) => {
    firebase.database() .ref('issues').child(key).remove();
    this.props.history.push('/');
  }

  issueSolutionsComment = (key) => {
    let dbRef = firebase.database().ref('issues/'+key+'/issueSolutions');
    dbRef.push({
      issueSolutionValue: this.state.issueSolutionValue,
      issueSolutionsValueAdder: this.state.issueSolutionsValueAdder,
    })
  }

  statusBtn(issueID){
    if(issueID){
      return(
        <div><button className="btn btn-success btn-lg">Cozuldu</button></div>
      );
    }
    else{
      return(
        <div><button className="btn btn-danger btn-lg">Cozulmedi</button></div>
      );
    }
  }

  render(){
    return(
      <div>
        <div className="container">
          <div className="row">
            <div className="col-8 d-flex justify-content-start">
              <h1>{this.state.issueHeader}</h1>
            </div>
            <div className="col-4 d-flex justify-content-end">
              {this.statusBtn(this.state.issueStatus)}
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-3">
              {this.state.issueCreator}
            </div>
            <div className="card text-center col-9">
              <div className="card-header text-left">
                <strong>Ariza Aciklamasi</strong>
              </div>
              <div className="card-body">
                <h6 className="card-text">
                  {this.state.issue}
                </h6>
              </div>
              <div className="card-footer text-muted text-right">
                {this.state.issueDate}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6"> 
              <input
              onChange={this.issueSolutionsOnChange}
              ref="issueSolutions"
              className="form-control text"/>
            </div>
            <div className="col-md-3">
              <select onChange={this.issueSolutionsValueAdderOnChange}>
                <option value="osman okuyan">osman okuyan</option>
                <option value="seref keser">seref keser</option>
              </select>
            </div>              
            <div className="col-md-3">
              <button className="btn" onClick={() => {this.issueSolutionsComment(this.state.issueID)}}>comment</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IssuesRouter;