import React, { useEffect, useMemo, useState } from 'react'
import { initializeApp } from 'firebase/app'

import { StateManager } from '../state/StateManager'
import { ColyseusService } from '../../lib/colyseus'
import { GameView } from './GameView'
import { GameState } from '../../common'

let audio = new Audio('/music/ingame.mp3')

export default function CoreView() {

  const [state, setState] = useState<GameState | null>(null);
  const [gameMusic, setGameMusic] = useState<HTMLAudioElement>(audio);

  let stateManager = new StateManager(new ColyseusService('ws', 'localhost:1337'), 'random')

  useMemo(() => {
    let ref

    //gameMusic.loop = true
    //gameMusic.play()

    stateManager.getGameRoom.then(() => {
      ref = stateManager.room.onStateChange(newState => {
        console.log('state change')
        setState(newState); 
      })
    })

    return () => {
      ref.clear()
      gameMusic.pause()
    };
  }, [])

  if (state == null) {
    return (
      <div style={{ textAlign: 'center' }}>
          <p>state is null</p>
      </div>
    )
  }

  return (<GameView stateManager={stateManager} state={state} />)
}
