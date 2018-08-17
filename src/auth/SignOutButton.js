import React from 'react';

import { auth } from './firebase';

const SignOutButton = () =>
  <button
    type="button"
    className="btn btn-dark"
    onClick={auth.doSignOut}
  >
    Çıkış Yap
  </button>

export default SignOutButton;