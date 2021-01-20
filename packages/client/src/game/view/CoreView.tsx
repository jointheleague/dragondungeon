import React, { useEffect, useState } from 'react';
import {LobbyStateView} from './LobbyView';
import { StateManager } from '../state/StateManager';
import { IGameState} from '../state/types';

import {GameView} from './GameView'

interface IProps {
  stateManager: StateManager;
}
export const CoreView = (props: IProps) => {
  const [state, setState] = useState<IGameState | null>(null);
  const {stateManager} = props;

  useEffect(() => {
    const ref = stateManager.room.onStateChange(newState => {
      setState(newState)
    })
    return () => {
      ref.clear();
    }
  }, [stateManager])

  if (state == null) {
    return <div>Loading...</div>
  }

  if (state.lifecycle === 'lobby') {
    return <LobbyStateView sessionId={stateManager.room.sessionId} room={stateManager.room} {...state}/>
  }
  return (<GameView stateManager={props.stateManager} state={state}/>)
}
