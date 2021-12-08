import React, { Component } from 'react';
import { StateManager } from '../state/StateManager';
import { Controls } from '../controls';
import { IInputs } from '../controls/types';
import { render } from "react-pixi-fiber";
import * as PIXI from 'pixi.js';

import { Viewport } from "pixi-viewport";

import { GameState } from '../../common';

interface GameViewProps {
  stateManager: StateManager;
  state: GameState;
}

interface GameViewState{};

export class GameView extends Component<GameViewProps, GameViewState> {
   app!: PIXI.Application;
   gameCanvas!: HTMLDivElement;
   viewport!: Viewport;

   /**
    * After mounting, add the Pixi Renderer to the div and start the Application.
    */
   componentDidMount() {
     this.app = new PIXI.Application({
       resizeTo: window,
       antialias: true,
       transparent: true
     });
     this.gameCanvas!.appendChild(this.app.view);
     this.viewport = new Viewport();
     this.app.stage.addChild(this.viewport);
     this.app.start();
     this.app.ticker.add(() => this.renderScene())
   }

   renderScene() {
    


    render(
      <></>, 
      this.viewport
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
       <Controls actionCallback={(v: IInputs) => this.actionCallback(v)} viewport={this.viewport}/>
          <div style={{marginLeft : '3vw', display:'flex'}}>
            {/* <Leaderboard p={this.props.stateManager.room.state.players} t={this.props.state.countdown}></Leaderboard> */}
          </div>
       <div ref={(thisDiv) => {component.gameCanvas = thisDiv!}} />
       </>
     );
   }
}
