import React, { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'

import { StateManager } from '../state/StateManager'
import { IGameState } from '../state/types'
import GameOver from './GameOver'
import { ColyseusService } from '../../lib/colyseus'
import { GameView } from './GameView'

let audio = new Audio('/music/ingame.mp3')

export default function CoreView() {

  const [state, setState] = useState<IGameState | null>(null);
  const [gameMusic, setGameMusic] = useState<HTMLAudioElement>(audio);

  let stateManager = new StateManager(new ColyseusService('ws', 'localhost:1337'), 'random')

  useEffect(() => {
    let ref

    gameMusic.loop = true
    gameMusic.play()

    stateManager.getGameRoom.then(() => {
      ref = stateManager.room.onStateChange(newState => {
        setState(newState)
      })
    })

    return () => {
      ref.clear()
      gameMusic.pause()
    };
  }, [stateManager])

  if (state == null) {
    return (
      <div style={{ textAlign: 'center' }}>
        <br /><br /><br />
        <img style={{ textAlign: 'center', height: '150px', imageRendering: 'pixelated' }} src="/img/dragons/basicDragon.png" />
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
