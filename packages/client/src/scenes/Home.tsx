import React from 'react';
import { navigate } from '@reach/router';
import { Box, Button } from '../components';
import {Space} from '../components/space';
import {Center} from '../components/center';

const Game = () => {
  return (
    <>
      <Center>
        <Space size='xl'/>
        <Box>
          <h1 style={{ textAlign: 'center' }}>Toybox 2020</h1>
        </Box>
        <br /><br /><br />
        <Button onClick={() => navigate("/play/random")} text="Press to begin"></Button>
        <br /><br /><br />
        <a href="/about">About</a>
        <a href="/feedback">Feedback</a>
      </Center>
    </>
  );
}

export default Game;