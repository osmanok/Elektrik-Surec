import React, { Component } from 'react';
import Navbar from './component/navbar';
import Home from './container/home';
import firebase from 'firebase';

class App extends Component {

  constructor(){
    super();

    firebase.initializeApp({databaseURL: "https://react-firebase-8e39d.firebaseio.com"})
    
  }
  render(){
    return(
      <div>
        <Navbar />
        <Home />
      </div>
    )
  }
}

export default App;
