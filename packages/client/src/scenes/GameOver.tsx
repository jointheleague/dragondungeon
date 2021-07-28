import React, {useEffect, useState} from 'react';
import { Box, Space, Center, Button } from '../components';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, getDoc, doc, limit } from 'firebase/firestore/lite';
import { navigate } from '@reach/router';
import DOMPurify from 'dompurify';

const homepage = () => {
  navigate('/home');
}

const GameOver = () => {
  return (
    <>
      <br /><br /><br />
      <Center>
        <Space size='xl'/>
        <Box>
          <h1 style={{ textAlign: 'center', fontSize: '40px', fontWeight: 'bold' }}>Game Over</h1>
        </Box>
        <Space size='m'/>
        <h1>Score : 240</h1>
        <h2 >Hits Dealt : 60</h2>
        <h2 style={{marginTop:'0px'}}> Hits Recived : 70</h2>
        
        <h2 style={{marginTop:'0px'}}> Coins picked up : 350</h2>
        <h2 style={{marginTop:'0px'}}> Place on leaderboard : 5</h2>
        <Space size='m'/>
        <h1>Past Top Scores</h1>
        <ul>
          <li >154</li>
          <li>120</li>
          <li>55</li>
          <li>21</li>
        </ul>
        <Space size='m'/>
        <Button onClick={homepage} text="Home" />
      </Center>
    </>
  );
}

export default GameOver;