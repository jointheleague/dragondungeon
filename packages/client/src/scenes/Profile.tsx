import React, {useEffect, useState} from 'react';
import { Center } from '../components/center';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { navigate } from '@reach/router';
import DOMPurify from 'dompurify';

let firebaseApp: any;
let data: any;

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

const db = firebase.firestore();

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState<string>('/icon.png');
  const [currentUser, setCurrentUser] = useState<any>({});
  const [userStats, setUserStats] = useState<any>({});
  const [userProfile, setUserProfile] = useState<any>({});
  useEffect(
    () => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          if (user.photoURL) {
            setProfilePicture(user.photoURL);
          }
          setCurrentUser(user);
          db.collection(user.uid).get().then((querySnapshot) => {
            if (querySnapshot.size == 0) {
              navigate('/');
            } else {
              querySnapshot.forEach((doc) => {
                if (doc.id == 'stats') {
                  setUserStats(doc.data());
                } else if (doc.id == 'profile') {
                  setUserProfile(doc.data());
                }
              });
            }
          });
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
        <h1>{userProfile.ign ? userProfile.ign : '...'}<span style={{ color: "#565a5c" }}>{userProfile.tag ? `#${userProfile.tag}` : ''}</span></h1>
        <h2>{currentUser.displayName || currentUser.phoneNumber || (currentUser.isAnonymous ? 'Anonymous' : '...')}</h2>
        {userStats.highscore ? 
          <>
            <h3><img src="/icon.png" height="20px" /> High Score: {userStats.highscore}</h3>
            <h3><img src="/icon.png" height="20px" /> Lifetime Coins: {userStats.coins}</h3>
            <h3><img src="/icon.png" height="20px" /> Damage Done: {userStats.damagedone}</h3>
            <h3><img src="/icon.png" height="20px" /> Damage Taken: {userStats.damagetaken}</h3>
            <h3><img src="/icon.png" height="20px" /> K/D (Damage Done/Taken) Ratio: {(userStats.damagedone / userStats.damagetaken).toFixed(2)}</h3>
            <h3><img src="/icon.png" height="20px" /> Medals Earned: {userStats.medals}</h3>
          </>
        : <>
            <h3><img src="/icon.png" height="20px" /> Loading...</h3>
            <h3><img src="/icon.png" height="20px" /> Loading...</h3>
            <h3><img src="/icon.png" height="20px" /> Loading...</h3>
            <h3><img src="/icon.png" height="20px" /> Loading...</h3>
            <h3><img src="/icon.png" height="20px" /> Loading...</h3>
            <h3><img src="/icon.png" height="20px" /> Loading...</h3>
          </>}
          <br /><br /><br />
        <div style={{
          backgroundColor: '#c60c30',
          color: 'white',
          borderRadius: '5px',
          width: '100px',
          padding: '10px',
          cursor: 'pointer'
        }}>
          <img src="/icon.png" style={{ cursor: 'pointer' }} height="20px" />
          <br />
          <h4 style={{ cursor: 'pointer' }}>Fireballs</h4>
        </div><br />
        <div style={{
          backgroundColor: '#00a1de',
          color: 'white',
          borderRadius: '5px',
          width: '100px',
          padding: '10px',
          cursor: 'pointer'
        }}>
          <img src="/icon.png" style={{ cursor: 'pointer' }} height="20px" />
          <br />
          <h4 style={{ cursor: 'pointer' }}>Snowballs</h4>
        </div><br />
        <div style={{
          backgroundColor: '#f9e300',
          color: 'black',
          borderRadius: '5px',
          width: '100px',
          padding: '10px',
          cursor: 'pointer'
        }}>
          <img src="/icon.png" style={{ cursor: 'pointer' }} height="20px" />
          <br />
          <h4 style={{ cursor: 'pointer' }}>Lightning</h4>
        </div><br />
        <div style={{
          backgroundColor: '#009b3a',
          color: 'white',
          borderRadius: '5px',
          width: '100px',
          padding: '10px',
          cursor: 'pointer'
        }}>
          <img src="/icon.png" style={{ cursor: 'pointer' }} height="20px" />
          <br />
          <h4 style={{ cursor: 'pointer' }}>Poison</h4>
        </div><br />
      </Center>
    </>
  );
}

export default Profile;