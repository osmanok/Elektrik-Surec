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
  <nav className="navbar navbar-expand-lg navbar-light bg-danger">
  <div className="container">
    <Link to="/">
      <h6 className="navbar-brand">Surec Takip</h6>
    </Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link text-black " to="/solvedissues">
            <strong>Cozulenler</strong> 
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-black " to="/signin">
            <strong>sign-in</strong> 
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-black " to="/signup">
            <strong>sign-up</strong> 
          </Link>
        </li>
        <li className="nav-item">
            <SignOutButton />
        </li>
      </ul>
    </div>
  </div>
</nav>

const NavigationNonAuth = () =>
  <ul>
    <li><Link to={"/signin"}>Sign In</Link></li>
  </ul>

export default Navigation;