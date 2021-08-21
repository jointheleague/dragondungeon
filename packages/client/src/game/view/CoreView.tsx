import React, { useEffect, useState } from 'react';
import { StateManager } from '../state/StateManager';
import { IGameState } from '../state/types';
import GameOver from '../../scenes/GameOver';
import Mousetrap from 'mousetrap';

import {GameView} from './GameView'
import { navigate } from '@reach/router';

interface IProps {
  stateManager: StateManager;
}

export const CoreView = (props: IProps) => {
  const [state, setState] = useState<IGameState | null>(null);
  const [gameMusic, setGameMusic] = useState<HTMLAudioElement>(new Audio('/music/ingame.mp3'));
  const {stateManager} = props;

  useEffect(() => {
    Mousetrap.bind('tab', () => { navigate('/home') });
    gameMusic.loop = true;
    gameMusic.play();

    const ref = stateManager.room.onStateChange(newState => {
      setState(newState)
    });

    return () => {
      ref.clear();
      gameMusic.pause();
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
      <GameOver stateManager={props.stateManager} state={state} music={gameMusic}/>
    )
  }

  return (<GameView stateManager={props.stateManager} state={state}/>)
}
