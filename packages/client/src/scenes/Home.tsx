import React, { useEffect } from 'react';
import { Box, Space, Button } from '../components';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, getDoc, doc } from 'firebase/firestore/lite';
import { navigate } from '@reach/router';
import { show_error_banner } from 'util/banner';
import useSound from 'use-sound';
import  * as Mousetrap from "mousetrap";

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

Mousetrap.bind('enter', resume);
Mousetrap.bind('shift+enter', () => show_error_banner('Coming Soon'));
Mousetrap.bind('alt+enter', () => navigate('/mydragon'));

const Home = (props: any) => {
  useEffect(() => {
    const music = new Audio('/music/startscreen.mp3');
    music.play();

    setTimeout(() => {
      (document.querySelector('#load1') as any).style.display = 'block';
    }, 1000)

    setTimeout(() => {
      (document.querySelector('#load2') as any).style.display = 'block';
    }, 2000)

    setTimeout(() => {
      (document.querySelector('#load3') as any).style.display = 'block';
    }, 3000)

    setTimeout(() => {
      (document.querySelector('#load4') as any).style.display = 'block';
    }, 4000)

    setTimeout(() => {
      (document.querySelector('#load5') as any).style.display = 'block';
    }, 5000)

    setTimeout(() => {
      (document.querySelector('#load6') as any).style.display = 'block';
    }, 8000)

    setTimeout(() => {
      (document.querySelector('#load7') as any).style.display = 'block';
    }, 10000)

    setTimeout(() => {
      (document.querySelector('#league-logo') as any).style.display = 'none';
    }, 11000)

    return () => {
      music.pause();
    }
  }, []);
  return (
    <>
      <div id="league-logo" style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
       }}>
         <img src="/jtl.png" style={{
           position: 'absolute',
           top: '30%',
           left: '30%',
           height: '150px'
         }} />
         <div style={{
           position: 'absolute',
           top: '60%',
           left: '30%',
           height: '150px'
         }}>
           <table>
             <tr>
               <td><img src="/fireball.png" id="load1" style={{ display: 'none', height: '80px', imageRendering: 'pixelated', padding: '15px' }} /></td>
               <td><img src="/iceball.png" id="load2" style={{ display: 'none', height: '80px', imageRendering: 'pixelated', padding: '15px' }} /></td>
               <td><img src="/electricball.png" id="load3" style={{ display: 'none', height: '80px', imageRendering: 'pixelated', padding: '15px' }} /></td>
               <td><img src="/mudball.png" id="load4" style={{ display: 'none', height: '80px', imageRendering: 'pixelated', padding: '15px' }} /></td>
               <td><img src="/poisonball.png" id="load5" style={{ display: 'none', height: '80px', imageRendering: 'pixelated', padding: '15px' }} /></td>
               <td><img src="/icon.png" id="load6" style={{ display: 'none', height: '80px', imageRendering: 'pixelated', padding: '15px' }} /></td>
               <td><img src="/basicDragon.png" id="load7" style={{ display: 'none', height: '80px', imageRendering: 'pixelated', padding: '15px' }} /></td>
             </tr>
           </table>
         </div>
      </div>
      <div id="page">
        <div id="heroContent" style={{ float: 'right', imageRendering: 'pixelated', padding: '20px' }}>
          <img src="/basicDragon.png" height="400px" />
        </div>
        <Box>
          <h1 style={{ textAlign: 'center', fontSize: '40px', fontWeight: 'bold' }}>DragonCoin</h1>
        </Box>
        <Button onClick={ resume } text="Classic DragonCoin" />
        <Button onClick={() => show_error_banner('Coming Soon') } text="Capture The Coins" />
        <Space size='xl'></Space>
        <Button onClick={() => navigate('/mydragon') } text="My Dragon" />
        <Button onClick={async () => {
          await signOut(auth);
          navigate('/');
        }} text="Log Out" />
      </div>
    </>
  );
}

export default Home;