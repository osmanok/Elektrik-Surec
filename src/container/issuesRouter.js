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
      issueIsWaiting: '',
      issueSolutionValue: '',
      issueSolutionValueAdder: '',
      issueSolutionDate: '',
      issueSolutions: [],
      issueSolver: '',
      issueSolverDate: '',
      deleteModalIsOpen: false,
      updateModalIsOpen: false,
      waitModalIsOpen: false,
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
  
  componentWillUpdate(){
    const databaseSolver = firebase.database().ref().child('issues/'+this.state.issueID+'/issueSolver');
    const databaseSolverDate = firebase.database().ref().child('issues/'+this.state.issueID+'/issueSolverDate');

    databaseSolver.on('value', (snapshot) => {
      this.state.issueSolver=snapshot.val()
    })

    databaseSolverDate.on('value', (snapshot) => {
      this.state.issueSolverDate=snapshot.val()
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
    this.setState({issueIsWaiting: item.issueIsWaiting})
  }
  
  statusChangeClick = () => {
    this.state.issueStatus
      ? this.setState({ issueStatus: false })
      : this.setState({ issueStatus: true })
  }

  statusWaitingChangeClick = () => {
    this.state.issueIsWaiting
      ? this.setState({ issueIsWaiting: false })
      : this.setState({ issueIsWaiting: true })
  }

  issueSolutionsOnChange = (e) => {
    let solutionAdderName = e.target.value
    this.setState({issueSolutionValue: solutionAdderName});
  }


  updateIssueStatus = (key) => {
    let dbRef = firebase.database().ref('issues').child(key);
    dbRef.update({
      issueStatus: this.state.issueStatus,
      issueSolver: firebase.auth().currentUser.email,
      issueSolverDate: new Date().toISOString(),
    })
  }

  updateIssueWaiting = (key) => {
    firebase.database().ref('issues').child(key).update({
      issueIsWaiting: this.state.issueIsWaiting,
    })
    this.props.history.push('/');
  }


  delete = (key) => {
    firebase.database().ref('issues').child(key).remove();
    this.props.history.push('/');
  }

  //comment push func
  issueSolutionsComment = (key) => {
    let dbRef = firebase.database().ref('issues/'+key+'/issueSolutions');
    dbRef.push({
      issueSolutionValue: this.state.issueSolutionValue,
      issueSolutionValueAdder: firebase.auth().currentUser.email,
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

  solutionPannel(issueSolver){
    if(issueSolver != ''){
      return(
        <div className="row">
          <div className="col-3 d-flex justify-content-center align-middle"></div>
          <div className="card text-center col-9">
            <div className="card-header text-left">
              <strong>Ariza Cozum</strong>
            </div>
            <div className="card-body">
              <h6 className="card-text">
                {this.state.issueSolver} tarafından çözülmüştür.
              </h6>
            </div>
            <div className="card-footer text-muted text-right">
              {this.state.issueSolverDate}
            </div>
          </div>
        </div>
      )
    }
  }

  cardAddBtnAlert(){
    alert('kart eklendi.')
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

  openWaitModal = () => {
    this.setState({ waitModalIsOpen: true });
  }

  closeWaitModal = () => {
    this.setState({ waitModalIsOpen: false });
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
                <div className="card-text">
                  <div>
                    {this.state.issueMachineId} nolu makinenin 
                    {this.state.issueHeader} arizasi var 
                  </div>
                </div>
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
          <div>
            {this.solutionPannel(this.state.issueSolver)}           
          </div>
          <hr/>
          <div> 
              <div className="col-md-6"> 
                <textarea
                onChange={this.issueSolutionsOnChange}
                ref="issueSolutions"
                className="form-control text"/>
              </div>
              <div className="col-md-3">
                <button disabled={ this.state.issueStatus} className="btn btn-secondary" onClick={() => {this.issueSolutionsComment(this.state.issueID)}}>Sorun Cozum Aciklmasi ekle</button>
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
              <button disabled={(this.state.issueStatus)} className="btn" onClick={() => {this.openUpdateModal(); this.statusChangeClick();}}>Cozuldu olarak isaretle</button>
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
                      <button className="col-md-6 btn btn-danger"onClick={() => {this.updateIssueStatus(this.state.issueID); this.closeUpdateModal();}}>
                        <span className="text-white">Evet</span>
                      </button>
                      <button className="col-md-6 btn btn-primary" onClick={() => {this.statusChangeClick(); this.closeUpdateModal();}}>
                        <span className="text-white">Hayir</span>
                    </button>
                    </div>
                  </div>
              </Modal>
            </div> 
            <div>
              <button disabled={(this.state.issueStatus)} className="btn" onClick={() => {this.openWaitModal(); this.statusWaitingChangeClick();}}>Kart Bekliyor.</button>
              <Modal
                isOpen={this.state.waitModalIsOpen}
                onRequestClose={this.closeWaitModal}
                contentLabel="wait modal"
                className="col-4 mt-5 mx-auto border border-danger bg-light"
              >
                <div className="modal-header d-block">
                    <h3 className="text-center text-danger">Kart bekleyenlere ekle</h3>
                  </div>
                  <div className="modal-content">
                    <div className="row">
                      <button className="col-md-6 btn btn-danger"onClick={() => {this.updateIssueWaiting(this.state.issueID); this.closeWaitModal();}}>
                        <span className="text-white">Evet</span>
                      </button>
                      <button className="col-md-6 btn btn-primary" onClick={() => {this.statusWaitingChangeClick(); this.closeWaitModal();}}>
                        <span className="text-white">Hayir</span>
                    </button>
                    </div>
                  </div> 
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IssuesRouter;