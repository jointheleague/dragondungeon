import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import { initializeApp } from 'firebase/app';
import { Button } from 'components';

initializeApp({
  apiKey: "AIzaSyCRClPzTZnRSg_fAap6ENnAkxUBQKJGk5w",
  authDomain: "leaguedragoncoin.firebaseapp.com",
  projectId: "leaguedragoncoin",
  storageBucket: "leaguedragoncoin.appspot.com",
  messagingSenderId: "320692217416",
  appId: "1:320692217416:web:04f00569ed1bf7b55e9a7d"
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
