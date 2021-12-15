import { Room } from 'colyseus.js'
import React, { useEffect, useMemo, useState } from 'react'
import { GameState } from '../../common'
import { ColyseusService } from '../../lib/colyseus'
import { StateManager } from '../state/StateManager'
import { GameView } from './GameView'

export default function FakeView() {
  let audio = useMemo(() => new Audio('/music/ingame.mp3'), [])
  console.log('FakeView Renderred')
  console.log('CoreView starting')
  const [state, setState] = useState<GameState | null>(null)
  const [gameMusic, setGameMusic] = useState<HTMLAudioElement>(audio)

  let stateManager = new StateManager(
    new ColyseusService('ws', 'localhost:1337'),
    'random',
  )
  let room: Room<GameState>
  stateManager.getGameRoom.then(() => {
    room = stateManager.room
  })
  if (room) {
    room.onStateChange((newState) => {
      setState(newState)
    })
  }
  if (state == null) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p>state is null</p>
      </div>
    )
  }

  return <GameView stateManager={stateManager} state={state} />
}
