import React from 'react';
import {Room} from 'colyseus.js';
import { Button, Center, Box, Space } from '../../components';
import {IGameState} from '../state/types';

interface LobbyStateViewProps extends IGameState {
  sessionId: string;
  room: Room;
}

export const LobbyStateView = (props: LobbyStateViewProps) => {
  const isHost = (props.sessionId in props.players) && props.players[props.sessionId].host
  return (
  <Center>
    <Space size='s'/>
    <Box>
    <h1>Toybox 2020</h1>
    {isHost &&
      <Button text="Start Game" onClick={() => props.room.send("start")}></Button>}
    {!isHost && <p>The game will start soon...</p>}
    </Box>
  </Center>)
}
