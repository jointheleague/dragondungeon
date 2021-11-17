import React, { useEffect, useState } from 'react'
import { StateManager } from '../state/StateManager'
import { IGameState } from '../state/types'
import GameOver from './GameOver'

import { ColyseusService } from '../../lib/colyseus'
import { GameView } from './GameView'

let audio = new Audio('/music/ingame.mp3')

export default function CoreView() {
  let stateManager = new StateManager(new ColyseusService('ws', 'localhost:1337'), 'new')
  // stateManager.setup()

  const [state, setState] = useState<IGameState | null>(null);
  const [gameMusic, setGameMusic] = useState<HTMLAudioElement>(audio);

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
      <GameOver stateManager={stateManager} state={state} music={gameMusic} />
    )
  }

  return (<GameView stateManager={stateManager} state={state} />)
}
