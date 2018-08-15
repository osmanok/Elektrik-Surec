import React, { Component } from 'react';
import { HashRouter, Route,} from 'react-router-dom';


import Navbar from './component/navbar';
import Navigation from './component/Navigation';
import HomePage from './container/HomePage';
import IssuesRouter from './container/issuesRouter';
import SolvedIssues from './component/solvedissues';
import SignUpPage from './auth/SignUpPage';
import SignInPage from './auth/SignInPage';
import { firebase } from './auth/firebase'
import withAuthentication from './auth/withAuthentication';
import Accounts from './auth/Accounts';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    }
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  render(){
    return(
      <HashRouter>
        <div>
          <Navigation authUser={this.state.authUser}/>
          <div>
            <Route exact path="/" component={() => <HomePage/>} />
            <Route path="/signup" component={() => <SignUpPage/>} />
            <Route path="/signin" component={() => <SignInPage/>} />
            <Route path="/accounts" component={() => <Accounts/>} />
            <Route path="/issues/:id" component={IssuesRouter} />
            <Route path="/solvedissues" component={SolvedIssues} />
          </div>
        </div>
      </HashRouter>
    )
  }
}

export default withAuthentication(App);
