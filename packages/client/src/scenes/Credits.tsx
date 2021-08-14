import React from 'react';
import { Box, Button } from '../components';
import { navigate } from '@reach/router';

const Credits = () => {
  return (
    <>
      <Box>
        <h1>About DragonCoin</h1>
      </Box>
      <div style={{ float: 'right', paddingLeft: '50px' }} id="sidebar">
        <Button onClick={() => navigate('/play/random')} text="Play" />
        <Button onClick={() => navigate('/home')} text="Home" />
      </div>
      <p style={{ padding: '20px' }}>
        <h2>Music</h2>
        <div style={{ padding: '10px' }}>
        The LEAGUE of Amazing Programmers<br />
        https://jointheleague.org
        </div>
        <h2>Music</h2>
        <div style={{ padding: '10px' }}>
        Volatile Reaction by Kevin MacLeod<br />
        Link: https://incompetech.filmmusic.io/song/5014-volatile-reaction<br />
        License: https://filmmusic.io/standard-license
        </div>
      </p>
    </>
  );
}

export default Credits;