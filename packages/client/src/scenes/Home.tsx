import React, { useEffect, useState } from 'react';
import { Box, Space, Center, Button } from '../components';
import randomItem from 'random-item';
import { getAuth, onAuthStateChanged, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, getDoc, doc } from 'firebase/firestore/lite';
import { navigate } from '@reach/router';

const db = getFirestore();
const auth = getAuth();

const resume = () => {
  onAuthStateChanged(auth, async (user) => {
    if (user?.isAnonymous) {
      const adj = randomItem(require('../wordlists/adjectives.json'));
      const noun = randomItem(require('../wordlists/nouns.json'));
      const d1 = randomItem([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
      const d2 = randomItem([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
      const d3 = randomItem([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
      const d4 = randomItem([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
      updateProfile(user, {
        displayName: `${adj}${noun}${d1}${d2}${d3}${d4}`.toLowerCase()
      });
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
            <Button onClick={resume} text="Play" />
            <br />
            <Button onClick={profilepage} text="Account" />
            <br />
          </>
        }
        {!userIsLoggedIn &&
          <Button text="Sign In with Google" onClick={() => {
            signInWithPopup(auth, new GoogleAuthProvider());
          }} />
        }
        <br />
        { props.location.search.includes('debug') ?
          <input type="text" placeholder="Development Server" style={{ fontSize: '20px', color: "white", backgroundColor: 'transparent', padding: '3px', border: '3px solid #c60c30', width:'45%' }} onChange={() => {
            window.localStorage.server = document.querySelector('input')?.value;
          }} /> :
          null
        }
      </Center>
    </>
  );
}

export default Game;