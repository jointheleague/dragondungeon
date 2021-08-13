import React, { useEffect, useState } from 'react';
import { Box, Space, Center, Button } from '../components';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInAnonymously, signOut } from 'firebase/auth';
import { getFirestore, getDoc, doc } from 'firebase/firestore/lite';
import { navigate } from '@reach/router';
import { show_error_banner } from 'util/banner';

const db = getFirestore();
const auth = getAuth();

const resume = () => {
  onAuthStateChanged(auth, async (user) => {
    if (user?.isAnonymous) {
      navigate('/play/random');
    } else if (user) {
      const user_data = await getDoc(doc(db, user.uid, "gameplay"));

      console.log(user_data.exists());

      if (user_data.exists()) {
        navigate('/play/random');
      } else {
        navigate('/story');
      }
    }
  });
}



if (document.addEventListener)
{
 document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement == null) {
    console.log('test')
    navigate('/');
  }
 }, false);
}

const Game = (props: any) => {
  const [ userIsLoggedIn, setUserIsLoggedIn ] = useState<boolean>(false);
  const [ checkUserCompleted, setCheckUserCompleted ] = useState<boolean>(false);
  const [ fullscreen, setFullscreen ] = useState<boolean>(false);
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
      <div id="heroContent" style={{ float: 'right', imageRendering: 'pixelated', padding: '20px' }}>
        <img src="/basicDragon.png" height="400px" />
        <h2 style={{
          position: 'absolute',
          bottom: '0px',
          right: '0px',
          padding: '40px',
          fontSize: '40px',
        }}>{time}</h2>
      </div>
      <Box>
        <h1 style={{ textAlign: 'center', fontSize: '40px', fontWeight: 'bold' }}>DragonCoin</h1>
      </Box>
      { checkUserCompleted && <>
        { userIsLoggedIn &&
          <>
            { fullscreen &&
              <>
                <Button onClick={resume} text="Classic DragonCoin" />
                <Button onClick={() => { show_error_banner('Coming Soon') }} text="Capture The Coins" />
                <Space size='xl'></Space>
                <Button onClick={() => { navigate('/mydragon') }} text="My Dragon" />
                <Button onClick={async () => {
                  await signOut(auth);
                  setUserIsLoggedIn(false);
                }} text="Log Out" />
              </>
            }
            { !fullscreen &&
              <Button onClick={() => {
                document.documentElement.requestFullscreen();
                let nav = navigator as any;
                nav.keyboard.lock();
                setFullscreen(true);
              }} text="Play" />
            }
          </>
        }
        { !userIsLoggedIn &&
          <>
            <Button text="Sign In with Google" onClick={() => {
              signInWithPopup(auth, new GoogleAuthProvider());
            }} />

            <Button text="Continue without Login" onClick={() => {
              signInAnonymously(auth);
            }} />
          </>
        }
      </> }
    </div>
  );
}

export default Game;