import { Room } from 'colyseus.js'
import router from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { GameState } from '../../common'
import { ColyseusService } from '../../lib/colyseus'
import { StateManager } from '../state/StateManager'
import { GameView } from './GameView'
let stateManager = new StateManager(
  new ColyseusService('ws', 'localhost:1337'),
  'random',
)
export default function CoreView() {
  const [room, setRoom] = useState<Room<GameState> | null>(null)
  const [state, setState] = useState<GameState | null>(null)
  const [gameOver, setGameOver] = useState<boolean>(false)

  useMemo(() => {
    let ref

    stateManager.getGameRoom.then(() => {
      ref = stateManager.room.onStateChange(newState => {
        setGameOver(newState.gameOver)
        setState(newState)
      })
    })

    return () => {
      ref.clear()
    };
  }, [])

  if (state == null) {
    return (
      <div style={{ textAlign: 'center' }}>
        <br /><br /><br />
        <img style={{ textAlign: 'center', height: '150px', imageRendering: 'pixelated' }} src="/img/dragons/basicDragon.png" />
      </div>
    )
  }

  if (gameOver) {
    return (
     <p>Game over</p>
    )
  }

  return <GameView stateManager={stateManager} state={state} />
}
