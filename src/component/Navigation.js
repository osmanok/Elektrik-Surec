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
      <div className="navbar-brand"><strong>Süreç Takip</strong></div>
    </Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link mr-5 text-dark" to="/solvedissues">
            <strong>Çözülenler</strong>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link mr-5 text-dark" to="/waitingissues">
            <strong>Bekleyen Arizalar</strong>
          </Link>
        </li>
        <li className="nav-item">
          <SignOutButton/>
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