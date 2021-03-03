import React from 'react';
import { Box } from '../components';
import { Space } from '../components/space';
import { Center } from '../components/center';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

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

const Game = () => {
  return (
    <>
      <br /><br /><br />
      <Center>
        <Space size='xl'/>
        <Box>
          <h1 style={{ textAlign: 'center', fontSize: '40px', fontWeight: 'bold' }}>DragonCoin</h1>
        </Box>
        <br /><br /><br />
        <StyledFirebaseAuth uiConfig={{
          signInSuccessUrl: '/play/random',
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            'anonymous',
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          ]
        }}  firebaseAuth={firebaseApp.auth()}/>
        <br />
        
      </Center>
    </>
  );
}

export default Game;