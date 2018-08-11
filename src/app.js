import React, { Component } from 'react';
import Navbar from './component/navbar';
import Home from './container/home';
import IssuesRouter from './container/issuesRouter';
import SolvedIssues from './component/solvedissues';
import firebase from 'firebase';
import { HashRouter, Route,} from 'react-router-dom';

class App extends Component {

  constructor(){
    super();

    firebase.initializeApp({databaseURL: "https://react-firebase-8e39d.firebaseio.com"})
    
  }

  render(){
    return(
      <HashRouter>
        <div>
          <Navbar />
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/issues/:id" component={IssuesRouter} />
            <Route path="/solvedissues" component={SolvedIssues} />
          </div>
        </div>
      </HashRouter>
    )
  }
}

export default App;
