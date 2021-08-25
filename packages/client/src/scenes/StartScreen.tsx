import React, { useEffect, useState } from 'react';
import { Box, Button } from '../components';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInAnonymously, User, signOut } from 'firebase/auth';
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore/lite';
import { navigate } from '@reach/router';
import { show_info_banner } from 'util/banner';

const auth = getAuth();
const db = getFirestore();

const StartScreen = (props: any) => {
  const [ user, setUser ] = useState<User>();
  const [ userIsAnon, setUserIsAnon ] = useState<boolean>();
  const [ time, setTime ] = useState<string>(new Date().toLocaleTimeString());
  useEffect(
    () => {
      setTimeout(() => {
        (document.querySelector('#logo-screen') as any).style.display = 'none';
        window.sessionStorage.setItem('hasViewedIntro', "true");
      }, 4000)
      
      onAuthStateChanged(auth, user => {
        if (user) {
          if (user.isAnonymous) {
            setUserIsAnon(true);
          }
          setUser(user);
        }
      });

      const clockInterval = setInterval(() => {
        setTime(new Date().toLocaleTimeString());
      }, 1000);

      return () => {
        clearInterval(clockInterval);
      };
    }, []
  );

  return (
    <>
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
       }}>
         <img id="league-logo" src="/jtl.png" style={{
          position: "relative",
          top: "40%",
          maxWidth: '90vw',
         }} />
      </div>
      <div id="page" className="mobile-center">
        <Box>
          <h1 style={{ textAlign: 'center', fontSize: '40px', fontWeight: 'bold' }}>dragondungeon</h1>
        </Box>
        <div id="heroContent" style={{ float: 'right', imageRendering: 'pixelated', padding: '20px' }}>
          <img src="/basicDragon.png" height="400px" />
        </div>
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
        <Button onClick={() => {
          onAuthStateChanged(auth, (user) => {
            if (user?.isAnonymous) {
              show_info_banner('Sign in with a dragondungeon account to create a custom dragon!');
              navigate('/');
            } else {
              navigate('/mydragon');
            }
          });
          navigate('/mydragon')} } text="My Dragon" />
        { ( user && !userIsAnon ) && <Button onClick={async () => {
          await signOut(auth);
          window.location.reload();
        }} text="Log Out" /> }
        { !user && <Button onClick={async () => {
          await signInWithPopup(auth, new GoogleAuthProvider());
        }} text="Log In" /> }
        { userIsAnon && <Button onClick={async () => {
          await signOut(auth);
          await signInWithPopup(auth, new GoogleAuthProvider());
        }} text="Log In" /> }
      </div>
    </>
  );
}

export default StartScreen;