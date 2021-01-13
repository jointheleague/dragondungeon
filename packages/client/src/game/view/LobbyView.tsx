import React from 'react';

import { LobbyRenderState } from '../state/StateManager';
import { Button, Center, Box, Space } from '../../components';

interface LobbyStateViewProps extends LobbyRenderState {}

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
