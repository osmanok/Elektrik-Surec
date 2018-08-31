import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database';
import Modal from 'react-modal';
import './AddModal.css';
import Issues from './issues';

//waiting cardi firebase pushlamaya calisiyordum.

class Home extends Component {
  constructor(){
    super();
    this.state = {
      issueID: '',
      issueHeader: '',
      issue: '',
      issueMachineId: '',
      issueCreator: '',
      issueStatus: false,
      issueIsWaiting: false,
      modalIsOpen: false,
    }

  }

  issueHeaderOnChange = (e) => {
    this.setState({ issueHeader: e.target.value });
  }

  issueOnChange = (e) => {
    this.setState({ issue: e.target.value });
  }

  issueMachineIdOnChange = (e) => {
    this.setState({ issueMachineId: e.target.value });
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }


  save = () => {
    const dbRef = firebase.database().ref('issues');
    const key = dbRef.push().key
    const date = new Date();
    const datestring = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + " " + (date.getHours()) + "." + date.getMinutes();
    console.log(datestring);

     dbRef.child(key).set({
      issueID: key,
      issueHeader: this.state.issueHeader,
      issue: this.state.issue,
      issueMachineId: this.state.issueMachineId,
      issueCreator: firebase.auth().currentUser.email,
      issueDate: datestring,
      issueStatus: false,
      issueIsWaiting: false,
    })
  }


  render(){
    return(
      <div>
        
        <Issues />
        
        <button onClick={this.openModal} type="button" className="btn btn-default btn-circle btn-xl"><i className="fas fa-plus"></i></button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className="col-6 mx-auto mt-5 border border-primary bg-light">
              <div className="modal-header">
                <h4>Ariza Giris Formu</h4>
              </div>
              <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-4">
                    <div className="form-group">
                      <input
                        onChange={this.issueMachineIdOnChange}
                        ref="issueMachineId"
                        className="form-control text"
                        placeholder="makine no"
                        />
                    </div>
                  </div>                
                  <div className="col-8">
                      <div className="form-group">
                        <textarea
                        onChange={this.issueHeaderOnChange}
                        ref="issueHeader"
                        className="form-control"
                        placeholder="Arıza Açıklaması"
                        />
                      </div>
                  </div>
                </div>
              </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary btn-lg" onClick={() => { this.save(); this.closeModal();}}>Kaydet</button>
                <button className="btn btn-danger btn-lg" onClick={this.closeModal}>Kapat</button>
              </div>
        </Modal>
      </div>
    )
  }
}

export default Home;
