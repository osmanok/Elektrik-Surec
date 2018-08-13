import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../auth/SignOutButton';
import AuthUserContext from '../auth/AuthUserContext'

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
  <ul>
    <li><Link to={"/"}>Home</Link></li>
    <li><Link to={"/account"}>Account</Link></li>
    <li><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul>
    <li><Link to={"/signin"}>Sign In</Link></li>
  </ul>

export default Navigation;