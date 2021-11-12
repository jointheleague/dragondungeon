import React, { useEffect, useState } from 'react';
import { StateManager } from '../state/StateManager';
import { IGameState } from '../state/types';
import GameOver from './GameOver';
import Mousetrap from 'mousetrap';

import { GameView } from './GameView'

interface IProps {
  stateManager: StateManager;
}
let audio = new Audio('/music/ingame.mp3');

export const CoreView = (props: IProps) => {
  const [state, setState] = useState<IGameState | null>(null);
  const [gameMusic, setGameMusic] = useState<HTMLAudioElement>(audio);
  const { stateManager } = props;

  useEffect(() => {
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
      <div style={{ textAlign: 'center' }}>
        <br /><br /><br />
        <img style={{ textAlign: 'center', height: '150px', imageRendering: 'pixelated' }} src="/basicDragon.png" />
      </div>
    )
  }

  if (state.gameOver) {
    return (
      <GameOver stateManager={props.stateManager} state={state} music={gameMusic} />
    )
  }

  return (<GameView stateManager={props.stateManager} state={state} />)
}
