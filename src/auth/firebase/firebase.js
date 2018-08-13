import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAd72I2AbkWKk-TGiUxeL7bje7zZnysQ_Y",
  authDomain: "react-firebase-8e39d.firebaseapp.com",
  databaseURL: "https://react-firebase-8e39d.firebaseio.com",
  projectId: "react-firebase-8e39d",
  storageBucket: "react-firebase-8e39d.appspot.com",
  messagingSenderId: "471254932932"
};

if(!firebase.apps.length){
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};