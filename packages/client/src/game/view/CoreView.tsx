import React, { useEffect, useState } from 'react';
import {LobbyStateView} from './LobbyView';
import { StateManager, RenderState, isLobbyRenderState } from '../state/StateManager';

import {GameView} from './GameView'

interface IProps {
  stateManager: StateManager;
}
export const CoreView = (props: IProps) => {
  const [state, setState] = useState<RenderState>(null)
  useEffect(() => {
    const sub = props.stateManager.state$.subscribe(s => {
      setState(s)
    })
    return () => {
      sub.unsubscribe();
    }
  })

  if (state == null) {
    return <div>Loading...</div>
  }
  if (isLobbyRenderState(state)) {
    return <LobbyStateView {...state}/>
  }
  return (<GameView stateManager={props.stateManager}/>)
}
