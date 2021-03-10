import React, {useEffect, useState} from 'react';
import { Center } from '../components/center';
import firebase from 'firebase/app';
import 'firebase/auth';
import { navigate } from '@reach/router';

let firebaseApp: any;

try {
  firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCRClPzTZnRSg_fAap6ENnAkxUBQKJGk5w",
    authDomain: "leaguedragoncoin.firebaseapp.com",
    projectId: "leaguedragoncoin",
    storageBucket: "leaguedragoncoin.appspot.com",
    messagingSenderId: "320692217416",
    appId: "1:320692217416:web:04f00569ed1bf7b55e9a7d"
  });
} catch {
  window.location.reload();
}



const Profile = () => {
  const [profilePicture, setProfilePicture] = useState<string>('/icon.png');
  useEffect(
    () => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          if (user.photoURL) {
            setProfilePicture(user.photoURL);
          }
        } else {
          navigate('/');
        }
      });
    }, []
  )
  return (
    <>
      <br /><br /><br />
      <Center>
        <a href="/">Back</a>
        <h1>Profile</h1>
        <img src={profilePicture} alt="Profile" height="50px"/>
      </Center>
    </>
  );
}

export default Profile;