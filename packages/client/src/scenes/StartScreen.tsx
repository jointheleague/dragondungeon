import React, { useEffect, useState } from 'react';
import { Box, Button, Space } from '../components';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInAnonymously, User, signOut } from 'firebase/auth';
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore/lite';
import { navigate } from '@reach/router';

const auth = getAuth();
const db = getFirestore();

const StartScreen = (props: any) => {
  const [ user, setUser ] = useState<User>();
  const [ userIsAnon, setUserIsAnon ] = useState<boolean>();
  const [ time, setTime ] = useState<string>(new Date().toLocaleTimeString());
  const [ music, setMusic ] = useState<HTMLAudioElement>(new Audio('/music/startscreen.mp3'));
  useEffect(
    () => {      
      onAuthStateChanged(auth, async user => {
        if (user) {
          if (user.isAnonymous) {
            setUserIsAnon(true);
          } else {
            const gameplayDoc = await getDoc(doc(db, user.uid, "gameplay"));
            switch (gameplayDoc.data()!.ballType) {
              case "electric":
                (document.body as any).style.background = "linear-gradient( rgba(255, 186, 0, 0.1), rgba(255, 186, 0, 0.1) ), url('/background-tile.png')";
                break;
              case "ice":
                (document.body as any).style.background = "linear-gradient( rgba(21, 0, 255, 0.1), rgba(21, 0, 255, 0.1) ), url('/background-tile.png')";
                break;
              case "poison":
                (document.body as any).style.background = "linear-gradient( rgba(60, 110, 26, 0.3), rgba(60, 110, 26, 0.3) ), url('/background-tile.png')";
                break;
              case "mud":
                (document.body as any).style.background = "linear-gradient( rgba(110, 74, 26, 0.4), rgba(110, 74, 26, 0.4) ), url('/background-tile.png')";
                break;
              default:
                break;
            }
          }
          setUser(user);
        }
      });

      const clockInterval = setInterval(() => {
        setTime(new Date().toLocaleTimeString());
      }, 1000);

      return () => {
        clearInterval(clockInterval);
        music.pause();
      };
    }, []
  );

  return (
    <>
      <div id="audiocontext-not-allowed" onClick={() => {
        music.loop = true;
        music.currentTime = 7;
        music.play();
        (document.querySelector('#audiocontext-not-allowed') as any).style.display = 'none';
        setTimeout(() => {
          if (document.querySelector('#logo-screen') !== null) {
            (document.querySelector('#logo-screen') as any).style.display = 'none';
          }
          window.sessionStorage.setItem('hasViewedIntro', "true");
        }, 4000);
      }} style={{
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        zIndex: 100,
       }}>
         {(window.innerWidth <= 600) && <h1>DRAGON DUNGEON</h1>}{(window.innerWidth >= 600) && <h1 style={{
           fontSize: '75px',
         }}>DRAGON DUNGEON</h1>}
         <img src="/basicDragon.png" style={{
          position: "relative",
          top: "40%",
          maxWidth: '90vw',
          height: '150px',
          imageRendering: 'pixelated',
         }} />
         <p>{(window.innerWidth <= 600) && "Tap Anywhere"}{(window.innerWidth >= 600) && "Click Anywhere"}</p>
      </div>
      <div id="logo-screen" onClick={() => {
        (document.querySelector('#logo-screen') as any).style.display = 'none';
      }} style={{
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        textAlign: 'center',
        zIndex: 99,
       }}>
         <img id="league-logo" src="/jtl.png" style={{
          position: "relative",
          top: "40%",
          maxWidth: '90vw',
         }} />
      </div>
      <div id="page" className="mobile-center">
        <Box>
          <p>{(window.innerWidth <= 600) && <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>DRAGON DUNGEON</h1>}{(window.innerWidth >= 600) && <h1 style={{ textAlign: 'center', fontSize: '50px', fontWeight: 'bold' }}>DRAGON DUNGEON</h1>}</p>
        </Box>
        <div id="heroContent" style={{ float: 'right', imageRendering: 'pixelated', padding: '20px' }}>
          <img src="/basicDragon.png" height="400px" />
        </div>
        <Space size="m" />
        <Button onClick={async () => {
          if (user) {
            if (user.isAnonymous) {
              await setDoc(doc(db, user.uid, "gameplay"), {
                ballType: 'fire',
                dragonSkin: 'basic',
              });
              navigate('/play/random');
            } else {
              navigate('/play/random');
            }
          } else {
            await signInAnonymously(auth);
            navigate('/play/random');
          }
        } } text="Play" />
        { ( user && !userIsAnon ) && <Button onClick={() => navigate('/mydragon')} text="My Dragon" /> }
        { ( user && !userIsAnon ) && <Button onClick={async () => {
          await signOut(auth);
          window.location.reload();
        }} text="Log Out" /> }
        { !user && <Button onClick={async () => {
          await signInWithPopup(auth, new GoogleAuthProvider());
          window.location.reload();
        }} text="Log In" /> }
        { userIsAnon && <Button onClick={async () => {
          await signOut(auth);
          await signInWithPopup(auth, new GoogleAuthProvider());
          window.location.reload();
        }} text="Log In" /> }
      </div>
    </>
  );
}

export default StartScreen;