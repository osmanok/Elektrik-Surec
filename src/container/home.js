import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database';
import {DB_CONFIG} from './config';
import Modal from 'react-modal';
import './AddModal.css';
import Issues from './issues';
import moment from 'moment';



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
      modalIsOpen: false,
      modalDetailIsOpen: false,
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

  issueCreatorOnChange = (e) => {
    this.setState({ issueCreator: e.target.value })
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  openDetailModal = () => {
    this.setState({ modalDetailIsOpen: true });
  }

  closeDetailModal = () => {
    this.setState({ modalDetailIsOpen: false });
  }


  save = () => {
    const dbRef = firebase.database().ref('issues');
    dbRef.push({
      issueID: dbRef.push().key,
      issueHeader: this.state.issueHeader,
      issue: this.state.issue,
      issueMachineId: this.state.issueMachineId,
      issueCreator: this.state.issueCreator,
      issueDate: new Date().toISOString(),
      issueStatus: false,
    })
  }


  render(){
    return(
      <div>
      <Issues />
      <button onClick={this.openModal} type="button" class="btn btn-default btn-circle btn-xl"><i class="fas fa-plus"></i></button>
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        contentLabel="Example Modal"
        className="col-6 ml-auto mr-auto mt-5 border border-primary bg-light">
            <div className="modal-header">
              <h4>Ariza Giris Formu</h4>
            </div>
            <div className="modal-body">
            <form>
              <div className="row">
                <div className="col-8">
                    <div className="form-group">
                      <input
                       onChange={this.issueHeaderOnChange}
                       ref="issueHeader"
                       className="form-control"
                       placeholder="Ariza Basligi"
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        rows="15"
                        placeholder="Ariza Aciklmasi"
                        onChange={this.issueOnChange}
                        ref="issue"
                      />
                    </div>
                </div>
                <div className="col-4">
                  <div className="form-group">
                    <input
                      onChange={this.issueMachineIdOnChange}
                      ref="issueMachineId"
                      className="form-control text"
                      placeholder="makine no"
                      />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={this.issueCreatorOnChange}
                      ref='issueCreator'
                      className="form-control text"
                      placeholder="Arizayi olusturan kisi"
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
