import React from 'react';

import Home from './home';
import withAuthorization from '../auth/withAuthorization';

const HomePage = () =>
  <div>
    <Home/>
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);