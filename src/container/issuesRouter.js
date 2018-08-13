import React, { Component } from 'react';
import firebase from 'firebase';
import Modal from 'react-modal';

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
      issueSolutionValueAdder: '',
      issueSolutionDate: '',
      issueSolutions: [],
      deleteModalIsOpen: false,
      updateModalIsOpen: false,
    }

  }

  componentDidMount() {
    const previousIssuesSolutions = this.state.issueSolutions;
    const database = firebase.database().ref().child('issues/'+this.state.issueID+'/issueSolutions');

    database.on('child_added', snap => {
      previousIssuesSolutions.push({
        issueSolutionValue: snap.val().issueSolutionValue,
        issueSolutionValueAdder: snap.val().issueSolutionValueAdder,
        issueSolutionDate: snap.val().issueSolutionDate,
      })

      this.setState({
        issueSolutions: previousIssuesSolutions
      })
    })
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
    this.setState({issueSolutionValueAdder: e.target.value})
  }

  updateStatusToTrue = (key, status) => {
    if(!status){
      this.statusChangeClick();
    }
    let dbRef = firebase.database().ref('issues').child(key);
    dbRef.update({
      issueStatus: this.state.issueStatus
    })
  }

  delete = (key) => {
    firebase.database().ref('issues').child(key).remove();
    this.props.history.push('/');
  }

  issueSolutionsComment = (key) => {
    let dbRef = firebase.database().ref('issues/'+key+'/issueSolutions');
    dbRef.push({
      issueSolutionValue: this.state.issueSolutionValue,
      issueSolutionValueAdder: this.state.issueSolutionValueAdder,
      issueSolutionDate: new Date().toISOString(),
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

  openDeleteModal = () => {
    this.setState({ deleteModalIsOpen: true});
  }

  closeDeleteModal = () => {
    this.setState({ deleteModalIsOpen: false});
  }
  
  openUpdateModal = () => {
    this.setState({ updateModalIsOpen: true});
  }

  closeUpdateModal = () => {
    this.setState({ updateModalIsOpen: false});
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
            <div className="col-3 d-flex justify-content-center align-middle">
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
          {/* map fonksyionu */}
          {
            this.state.issueSolutions.map((solutions) => {
              return (
                <div className="row">
                  <div className="col-3 d-flex justify-content-center align-middle">
                    {solutions.issueSolutionValueAdder}
                  </div>
                  <div className="card text-center col-9">
                    <div className="card-header text-left">
                      <strong>Ariza Cozum Aciklamasi</strong>
                    </div>
                    <div className="card-body">
                      <h6 className="card-text">
                        {solutions.issueSolutionValue}
                      </h6>
                    </div>
                    <div className="card-footer text-muted text-right">
                      {solutions.issueSolutionDate}
                    </div>
                  </div>
                </div>
              )
            })
          }
          {/* map fonksyionu */}
          <hr/>
          <div> 
            <div className="row">
              <div className="col-md-3">
                <select onChange={this.issueSolutionsValueAdderOnChange}>
                  <option value="osman okuyan">osman okuyan</option>
                  <option value="seref keser">seref keser</option>
                </select>
              </div>
              <div className="col-md-6"> 
                <input
                onChange={this.issueSolutionsOnChange}
                ref="issueSolutions"
                className="form-control text"/>
              </div>
              <div className="col-md-3">
                <button className="btn btn-secondary" onClick={() => {this.issueSolutionsComment(this.state.issueID)}}>Sorun Cozum Aciklmasi ekle</button>
              </div>
            </div>
          </div>
          <br/>
          <div className="row justify-content-end">
            <div>
              <button className="btn" onClick={this.openDeleteModal}>Arizayi Sil</button>
              <Modal 
                isOpen={this.state.deleteModalIsOpen}
                onRequestClose={this.closeDeleteModal}
                contentLabel="Delete Modal"
                className="col-4 mt-5 mx-auto border border-danger bg-light"
              >
                  <div className="modal-header d-block">
                    <h3 className="text-center text-danger">Emin misin?</h3>
                  </div>
                  <div className="modal-content">
                    <div className="row">
                      <button className="col-md-6 btn btn-danger" onClick={() => {this.delete(this.state.issueID); this.closeDeleteModal();}}>
                        <span className="text-white">Evet</span>
                      </button>
                      <button className="col-md-6 btn btn-primary" onClick={this.closeDeleteModal}>
                        <span className="text-white">Hayir</span>
                    </button>
                    </div>
                  </div>
              </Modal>
            </div>              
            <div className="col-md-3">
              <button className="btn" onClick={this.openUpdateModal}>Cozuldu olarak isaretle</button>
              <Modal 
                isOpen={this.state.updateModalIsOpen}
                onRequestClose={this.closeUpdateModal}
                contentLabel="Update Modal"
                className="col-4 mt-5 mx-auto border border-danger bg-light"
              >
                  <div className="modal-header d-block">
                    <h3 className="text-center text-danger">Emin misin?</h3>
                  </div>
                  <div className="modal-content">
                    <div className="row">
                      <button className="col-md-6 btn btn-danger"onClick={() => {this.updateStatusToTrue(this.state.issueID, this.state.issueStatus); this.closeUpdateModal();}}>
                        <span className="text-white">Evet</span>
                      </button>
                      <button className="col-md-6 btn btn-primary" onClick={this.closeUpdateModal}>
                        <span className="text-white">Hayir</span>
                    </button>
                    </div>
                  </div>
              </Modal>
              {console.log(this.state.issueStatus)}
            </div> 
          </div>
        </div>
      </div>
    );
  }
}

export default IssuesRouter;