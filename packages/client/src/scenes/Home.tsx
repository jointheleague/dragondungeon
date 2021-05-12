import React, { useEffect, useState } from 'react';
import { Box, Space, Center } from '../components';
import firebase from 'firebase/app';
import randomItem from 'random-item';
import 'firebase/auth';
import 'firebase/firestore';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { navigate } from '@reach/router';

const db = firebase.firestore();

const resume = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user?.isAnonymous) {
      const adj = randomItem(require('../wordlists/adjectives.json'));
      const noun = randomItem(require('../wordlists/nouns.json'));
      const d1 = randomItem([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
      const d2 = randomItem([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
      const d3 = randomItem([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
      const d4 = randomItem([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
      user.updateProfile({
        displayName: `${adj}${noun}${d1}${d2}${d3}${d4}`.toLowerCase()
      });
      navigate('/play/random');
    } else if (user) {
      db.collection(user.uid).doc('login').get().then((doc) => {
        if (doc.data()?.hasPickedIGN) {
          navigate('/play/random');
        } else {
          navigate('/onboarding')
        }
      });
    }
  });
}

const profilepage = () => {
  navigate('/profile');
}

const Game = (props: any) => {
  const [ userIsLoggedIn, setUserIsLoggedIn ] = useState<boolean>(false);
  useEffect(
    () => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setUserIsLoggedIn(true);
        }
      });
    }, []
  )

  return (
    <>
      <br /><br /><br />
      <Center>
        <Space size='xl'/>
        <Box>
          <h1 style={{ textAlign: 'center', fontSize: '40px', fontWeight: 'bold' }}>DragonCoin</h1>
        </Box>
        <br /><br /><br />
        {userIsLoggedIn && 
          <>
            <button onClick={resume} className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button" style={{backgroundColor: '#c60c30'}} data-upgraded=",MaterialButton"><span className="firebaseui-idp-icon-wrapper"><img className="firebaseui-idp-icon" alt="" src="/icon.png" /></span><span style={{ color: '#ffffff', fontSize: '25px', fontWeight: 'bolder' }} className="firebaseui-idp-text firebaseui-idp-text-long">Start Game</span><span style={{ color: '#ffffff', fontSize: '20px', fontWeight: 'bolder' }} className="firebaseui-idp-text firebaseui-idp-text-short">Start</span></button>
            <br />
            <button onClick={profilepage} className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button" style={{backgroundColor: '#c60c30'}} data-upgraded=",MaterialButton"><span className="firebaseui-idp-icon-wrapper"><img className="firebaseui-idp-icon" alt="" src="/icon.png" /></span><span style={{ color: '#ffffff', fontSize: '20px', fontWeight: 'bolder' }} className="firebaseui-idp-text firebaseui-idp-text-long">My Account</span><span style={{ color: '#ffffff', fontSize: '20px', fontWeight: 'bolder' }} className="firebaseui-idp-text firebaseui-idp-text-short">Account</span></button>
            <br />
            <hr style={{ borderTop: '3px solid #c60c30', borderBottom: 'none', width: '100%' }} />
          </>
        }
        <StyledFirebaseAuth uiConfig={{
          signInSuccessUrl: '/',
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            'anonymous',
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          ]
        }}  firebaseAuth={firebase.auth()}/>
        <br />
        { props.location.search.includes('debug') ?
          <input type="text" placeholder="Development Server" style={{ fontSize: '20px', color: "white", backgroundColor: 'transparent', padding: '3px', border: '3px solid #c60c30', width:'45%' }} onChange={() => {
            window.localStorage.server = document.querySelector('input')?.value;
            window.location.reload();
          }} /> :
          null
        }
      </Center>
    </>
  );
}

export default Game;