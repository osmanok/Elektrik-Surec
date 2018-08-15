import React, { Component } from 'react';
import { db } from './firebase';

//If admin user want to change any user this component will be develop for that.

class Accounts extends Component {
  constructor(props){
    super(props);

    this.state={
      users: null,
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
    this.setState({ users: snapshot.val() })
    );
  }
  

  render() {
    const { users } = this.state;

    return (
      <div>
        { !!users && <UserList users={users} /> }
      </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>

export default Accounts;