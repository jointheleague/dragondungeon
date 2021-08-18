import React, { useEffect, useState } from 'react';
import { Box, Space, Button } from '../components';
import { getAuth, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore/lite';
import { navigate, redirectTo } from '@reach/router';
import { show_error_banner, show_info_banner } from 'util/banner';
import  * as Mousetrap from "mousetrap";

const db = getFirestore();
const auth = getAuth();

const resume = () => {
  onAuthStateChanged(auth, async (user) => {
    if (user?.isAnonymous) {
      await setDoc(doc(db, user.uid, "gameplay"), {
        ballType: 'fire',
        dragonSkin: 'basic',
      });
      
      navigate('/play/random');
    } else if (user) {
      const user_data = await getDoc(doc(db, user.uid, "gameplay"));
      if (user_data.exists()) {
        navigate('/play/random');
      } else {
        navigate('/story');
      }
    }
  });
}

const Home = (props: any) => {
  const [userIsAnon, setUserIsAnon] = useState<boolean>(false);
  useEffect(() => {
    Mousetrap.bind('enter', resume);
    Mousetrap.bind('shift+enter', () => show_error_banner('Coming Soon'));
    Mousetrap.bind('alt+enter', () => navigate('/mydragon'));
    Mousetrap.bind('space', () => {(document.querySelector('#logo-screen') as any).style.display = 'none'});

    onAuthStateChanged(auth, (user) => {
      if (user?.isAnonymous) {
        setUserIsAnon(true);
      }
    });

    const music = new Audio('/music/startscreen.mp3');
    music.loop = true;
    music.play();

    setTimeout(() => {
      (document.querySelector('#league-logo') as any).style.display = 'none';
      (document.querySelector('#dragoncoin-logo') as any).style.display = 'block';
    }, 5000)

    setTimeout(() => {
      (document.querySelector('#logo-screen') as any).style.display = 'none';
    }, 11000)

    return () => {
      music.pause();
      Mousetrap.unbind('enter');
      Mousetrap.unbind('shift+enter');
      Mousetrap.unbind('alt+enter');
      Mousetrap.unbind('space');
    }
  }, []);
  return (
    <>
      <div id="logo-screen" style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
       }}>
         <img id="league-logo" src="/jtl.png" style={{
           position: 'absolute',
           top: '30%',
           left: '30%',
           height: '150px'
         }} />
         <h1 id="dragoncoin-logo" style={{
           position: 'absolute',
           top: '35%',
           left: '25%',
           display: 'none',
           fontSize: '40pt',
           color: '#c60c30'
          }}>DragonCoin Alpha</h1>
         <h4 style={{
           position: 'fixed',
           top: 0,
           left: 0,
           fontSize: '10pt',
           padding: '10px',
         }}>[Space] Skip</h4>
      </div>
      <div id="page">
        <div id="heroContent" style={{ float: 'right', imageRendering: 'pixelated', padding: '20px' }}>
          <img src="/basicDragon.png" height="400px" />
        </div>
        <Box>
          <h1 style={{ textAlign: 'center', fontSize: '40px', fontWeight: 'bold' }}>DragonCoin</h1>
        </Box>
        <Button onClick={ resume } text="Classic DragonCoin" />
        <Button onClick={() => show_info_banner('Capture The Coins mode is coming soon!') } text="Capture The Coins" />
        <Space size='xl'></Space>
        <Button onClick={() => {
          onAuthStateChanged(auth, (user) => {
            if (user?.isAnonymous) {
              show_info_banner('Sign in with a DragonCoin account to create a custom dragon!');
              navigate('/home');
            } else {
              navigate('/mydragon');
            }
          });
          navigate('/mydragon')} } text="My Dragon" />
        <Button onClick={async () => {
          await signOut(auth);
          navigate('/');
        }} text="Log Out" />
        { userIsAnon && 
          <Button onClick={async () => {
            await signInWithPopup(auth, new GoogleAuthProvider());
            navigate('/');
          }} text="Unlock DragonCoin" />
        }
      </div>
    </>
  );
}

export default Home;