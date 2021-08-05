import React, { useEffect, useState } from 'react';
import { StateManager } from '../state/StateManager';
import { IGameState } from '../state/types';
import { show_tutorial } from './tutorial';
import GameOver from '../../scenes/GameOver';
import { navigate } from '@reach/router';

import {GameView} from './GameView'

interface IProps {
  stateManager: StateManager;
}

export const CoreView = (props: IProps) => {
  const [state, setState] = useState<IGameState | null>(null);
  const {stateManager} = props;

  useEffect(() => {
    show_tutorial();

    const ref = stateManager.room.onStateChange(newState => {
      setState(newState)
    });

    return () => {
      ref.clear();
    };
  }, [stateManager])

  if (state == null) {
    return (
      <>
        <br /><br /><br />
        <p style={{ textAlign: 'center' }}>Loading...</p>
      </>
    )
  }

  if(state.gameOver){
    return (
      <GameOver stateManager={props.stateManager} state={state}/>
    )
  }

  return (<GameView stateManager={props.stateManager} state={state}/>)
}
