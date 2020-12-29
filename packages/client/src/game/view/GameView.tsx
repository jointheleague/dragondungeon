import React, { Component} from 'react';
import { StateManager, isGameRenderState } from '../state/StateManager';

import { useDisableScroll } from '../../hooks';

import {Controls} from '../controls';
import {IInputs} from '../controls/types';

import { Dragon } from './entities/dragon/index';
import { render } from "react-pixi-fiber";

import * as PIXI from 'pixi.js';

interface GameViewProps {
  stateManager: StateManager;
}

interface GameViewState{};

const ScrollDisable = () => {
  useDisableScroll();
  return <></>
}

export class GameView extends Component<GameViewProps, GameViewState> {
   app!: PIXI.Application;
   gameCanvas!: HTMLDivElement;

   /**
    * After mounting, add the Pixi Renderer to the div and start the Application.
    */
   componentDidMount() {
     this.app = new PIXI.Application({
       resizeTo: window,
       antialias: true,
     });
     this.gameCanvas!.appendChild(this.app.view);
     this.app.start();
     this.app.ticker.add((dx) => this.renderScene(dx))
   }

   rotation: number = 0;
   renderScene(dx: number) {
    const state = this.props.stateManager.getGameState();
    if (!isGameRenderState(state)){
      // shouldn't really ever happen but it may due to race conditions, just exit.
      return;
    }


    const players = []
    for (let pid in state.players) {
      const player = state.players[pid];
      players.push(<Dragon key={pid} player={player} />,)
    }
    render(
      <>{players}</>,
      this.app.stage
    );
   }

   /**
    * Stop the Application when unmounting.
    */
   componentWillUnmount() {
     this.app.stop();
   }

   actionCallback(v: IInputs) {
     this.props.stateManager.room?.send('input', v);
   }

   /**
    * Simply render the div that will contain the Pixi Renderer.
    */
   render() {
     let component = this;
     return (
       <>
       <Controls actionCallback={(v: IInputs) => this.actionCallback(v)}/>
       <ScrollDisable/>
       <div ref={(thisDiv) => {component.gameCanvas = thisDiv!}} />
       </>
     );
   }
}
