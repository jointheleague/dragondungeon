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
        <h1>Coins : 300</h1>
        <div style={{display:'flex', flexDirection:'row'}}>
          <h1>Hits </h1>
          <h2>Dealt : 60 Recived : 70</h2>
        </div>
        <Space size='m'/>
        <Button onClick={homepage} text="Home" />
      </Center>
    </>
  );
}

export default GameOver;