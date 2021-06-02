import React, { useEffect, useState } from 'react';
import { StateManager } from '../state/StateManager';
import { IGameState } from '../state/types';
import { show_tutorial } from './tutorial';

import {GameView} from './GameView'

interface IProps {
  stateManager: StateManager;
}
export const CoreView = (props: IProps) => {
  const [state, setState] = useState<IGameState | null>(null);
  const {stateManager} = props;

  useEffect(() => {
    const ref = stateManager.room.onStateChange(newState => {
      setState(newState)
    })
    return () => {
      ref.clear();
    }
    show_tutorial();
  }, [stateManager])

  if (state == null) {
    return (
      <>
        <br /><br /><br />
        <p style={{ textAlign: 'center' }}>Loading...</p>
      </>
    )
  }

  return (<GameView stateManager={props.stateManager} state={state}/>)
}
