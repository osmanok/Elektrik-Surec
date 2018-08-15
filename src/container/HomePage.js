import React, { Component } from 'react';

import Home from './home';
import withAuthorization from '../auth/withAuthorization';

class HomePage extends Component {
  render() {
    return (
      <div>
        <Home/>
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);