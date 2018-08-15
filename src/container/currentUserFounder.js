import firebase from 'firebase';

export const findCurrentUserName = ( email ) => {
  let database = firebase.database().ref('users');
  let user = [];
  database.on('child_added', snap => {
    users.push({
      userEmail: snap.val().email,
      userName: snap.val().username,
    })
  })
}
