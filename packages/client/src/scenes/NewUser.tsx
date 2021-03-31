import React from 'react';
import { Center } from '../components/center';
import { Box } from '../components/box';
import { Space } from '../components/space';
import { Button } from '../components/button';
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

const processUser = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const selectedName:string = document.querySelector('input')?.value || '';
      if (DOMPurify.sanitize(selectedName) !== '') {
        user.updateProfile({
          displayName: DOMPurify.sanitize(selectedName)
        })
      }
    }
  });
}

const NewUser = () => {
  return (
    <>
      <br /><br /><br />
      <Center>
        <Space size='xl' />
        <Box>
          <h1 style={{ textAlign: 'center', fontSize: '40px', fontWeight: 'bold' }}>DragonCoin</h1>
        </Box>
        <Space size='m' />
        <b>Now, you'll need to pick a Dragon Name. Your first name is a sensible choice.</b>
        <p>Remember to choose something people can't use to find you in real life.</p>
        <Space size='m' />
        <input type="text" placeholder="Dragon Name" style={{ fontSize: '20px', color: "white", backgroundColor: 'transparent', padding: '3px', border: '3px solid #c60c30', width:'45%' }} />
        <Button text="Confirm" style={{ width:'40%' }} onClick={processUser} />
      </Center>
    </>
  );
}


export default NewUser;