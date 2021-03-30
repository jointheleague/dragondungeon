import React from 'react';
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

const NewUser = () => {
  navigate('/play/random');
  return null;
}

export default NewUser;