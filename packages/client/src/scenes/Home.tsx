import React, { useEffect, useState } from 'react';
import { Box, Space, Center, Button } from '../components';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInAnonymously } from 'firebase/auth';
import { getFirestore, getDoc, doc } from 'firebase/firestore/lite';
import { navigate } from '@reach/router';

const db = getFirestore();
const auth = getAuth();

const resume = () => {
  onAuthStateChanged(auth, async (user) => {
    if (user?.isAnonymous) {
      navigate('/play/random');
    } else if (user) {
      const user_data = await getDoc(doc(db, user.uid, "login"));

      console.log(user_data.exists());

      if (user_data.exists()) {
        navigate('/play/random');
      } else {
        navigate('/onboarding');
      }
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
      onAuthStateChanged(auth, user => {
        if (user) {
          setUserIsLoggedIn(true);
        }
      });
    }, []
  );

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
            <Button onClick={resume} text="Play" />
            <Button onClick={profilepage} text="Account" />
          </>
        }
        {!userIsLoggedIn &&
          <>
            <Button text="Sign In with Google" onClick={() => {
              signInWithPopup(auth, new GoogleAuthProvider());
            }} />

            <Button text="Continue without Login" onClick={() => {
              signInAnonymously(auth);
            }} />
          </>
        }
        <br />
        { props.location.search.includes('debug') ?
          <>
            <input type="text" placeholder="Development Server" id="dbg-dev" style={{ fontSize: '20px', color: "white", backgroundColor: 'transparent', padding: '3px', border: '3px solid #c60c30', width:'45%' }} onChange={() => {
              window.localStorage.server = (document.querySelector('#dbg-dev') as HTMLInputElement).value;
            }} />
            <input type="text" placeholder="Websocket Protocol" id="dbg-pro" style={{ fontSize: '20px', color: "white", backgroundColor: 'transparent', padding: '3px', border: '3px solid #c60c30', width:'45%' }} onChange={() => {
              window.localStorage.protocol = (document.querySelector('#dbg-pro') as HTMLInputElement).value;
            }} />
          </> :
          null
        }
      </Center>
    </>
  );
}

export default Game;