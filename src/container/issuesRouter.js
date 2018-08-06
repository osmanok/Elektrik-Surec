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
    }
  }

  componentWillMount() {
    
    console.log(this.props);

    const item = this.props.history.location.state.issues
    
    this.setState({issueID: item.issueID})
    this.setState({issueHeader: item.issueHeader})
    this.setState({issue: item.issue})
    this.setState({issueDate: item.issueDate})
    this.setState({issueMachineId: item.issueMachineId})
    this.setState({issueCreator: item.issueCreator})
    this.setState({issueStatus: item.issueStatus})
  }


  
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default IssuesRouter;