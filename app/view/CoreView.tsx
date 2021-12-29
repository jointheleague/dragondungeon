import { Room } from 'colyseus.js'
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
  let audio = useMemo(() => new Audio('/music/ingame.mp3'), [])
  console.log('FakeView Renderred')
  console.log('CoreView starting')
  const [room, setRoom] = useState<Room<GameState> | null>(null)
  const [state, setState] = useState<GameState | null>(null)
  const [gameMusic, setGameMusic] = useState<HTMLAudioElement>(audio)

  useEffect(() => {
    stateManager.getGameRoom.then(() => {
      setRoom(stateManager.room)
    })
    if (room) {
      room.onStateChange((newState) => {
        setState(newState)
      })
    }
  }, [room])
  if (state == null) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p>state is null</p>
      </div>
    )
  }

  return <GameView stateManager={stateManager} state={state} />
}
