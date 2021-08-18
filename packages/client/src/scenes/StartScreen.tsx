import React, { useEffect, useState } from 'react';
import { Box, Space, Center, Button } from '../components';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, } from 'firebase/auth';
import { navigate } from '@reach/router';

const auth = getAuth();

document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement == null) {
    navigate('/');
  }
}, false);


const StartScreen = (props: any) => {
  const [ userIsLoggedIn, setUserIsLoggedIn ] = useState<boolean>(false);
  const [ checkUserCompleted, setCheckUserCompleted ] = useState<boolean>(false);
  const [ time, setTime ] = useState<string>(new Date().toLocaleTimeString());
  useEffect(
    () => {
      onAuthStateChanged(auth, user => {
        if (user) {
          setUserIsLoggedIn(true);
        }
        setCheckUserCompleted(true);
      });

      setInterval(() => {
        setTime(new Date().toLocaleTimeString());
      }, 1000)
    }, []
  );

  return (
    <div id="page">
      <Center>
        <Space size='giant'></Space>
        <Box>
          <h1 style={{ textAlign: 'center', fontSize: '40px', fontWeight: 'bold' }}>DragonCoin</h1>
        </Box>
        <Space size='l'></Space>
        { checkUserCompleted && <>
          <Button onClick={ async () => {
            if (userIsLoggedIn) {
              document.documentElement.requestFullscreen();
              let nav = navigator as any;
              nav.keyboard.lock();
              navigate('/home');
            } else {
              await signInWithPopup(auth, new GoogleAuthProvider());
            }
          } } text="Play" />
        </> }
        <Space size='l'></Space>
        <h1>{ time }</h1>
      </Center>
    </div>
  );
}

export default StartScreen;