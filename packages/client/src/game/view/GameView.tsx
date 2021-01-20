import React, { Component} from 'react';
import { StateManager } from '../state/StateManager';
import { useDisableScroll } from '../../hooks';
import {Controls} from '../controls';
import {IInputs} from '../controls/types';
import { Dragon } from './entities/dragon/index';
import { render } from "react-pixi-fiber";
import {FireballView} from './entities/fireball/index';
import * as PIXI from 'pixi.js';
import { Coin } from './entities/coin';
import {IGameState} from '../state/types';

interface GameViewProps {
  stateManager: StateManager;
  state: IGameState;
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
     this.app.ticker.add(() => this.renderScene())
   }

   renderScene() {
    const state = this.props.state;
    const players = [];
    const coins = [];
    const fireballs = [];
    for (let pid in state.players) {
      const player = state.players[pid];

      players.push(<Dragon key={pid} player={player} />,)


      for(let fireball of state.players[pid].fireballs){
        fireballs.push(<FireballView key={fireball.id} fireball = {fireball}/>)
      }

      //fireballs.push(player.fireballs);
    }
    for(let i = 0; i <state.coins.length; i++){
      coins.push(<Coin key={state.coins[i].key+""} x={state.coins[i].x} y={state.coins[i].y}/>);
    }
    render(
      <>{coins}{players}{fireballs}</>,
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
