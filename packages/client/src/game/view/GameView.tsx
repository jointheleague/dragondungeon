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
import { CoinJar } from './entities/coinJar';
import { BorderFence } from './entities/borderFence';
import {IGameState} from '../state/types';
import { Viewport } from "pixi-viewport";
import { Leadboard } from 'components/leaderboard';
import firebase from 'firebase/app';
import ReactNipple from 'react-nipple';
import {Bar} from './entities/healthBar/healthBar';
import { v4 } from "uuid";
import 'firebase/auth';

let firebaseApp;

try {
  firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCRClPzTZnRSg_fAap6ENnAkxUBQKJGk5w",
    authDomain: "leaguedragoncoin.firebaseapp.com",
    projectId: "leaguedragoncoin",
    storageBucket: "leaguedragoncoin.appspot.com",
    messagingSenderId: "320692217416",
    appId: "1:320692217416:web:04f00569ed1bf7b55e9a7d"
  });
  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      window.location.href = '/';
    } else {
      console.log(user.displayName);
    }
  });
} catch {
  window.location.reload();
}

interface GameViewProps {
  stateManager: StateManager;
  state: IGameState;

}
const scale = 1;
interface GameViewState{};

const ScrollDisable = () => {
  useDisableScroll();
  return <></>
}

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
     this.viewport.scale = new PIXI.Point(scale, scale);
     this.app.stage.addChild(this.viewport);
     this.app.start();
     this.app.ticker.add(() => this.renderScene())
   }

   renderScene() {
    const state = this.props.state;
    const players = [];
    const coins = [];
    const fireballs = [];
    const healthBars = [];
    const fences = [];
    const coinJar = <CoinJar key={"only"} x={1000} y={500}/>;
    const id  = this.props.stateManager.id
    const me = this.props.state.players[id];
    for (let pid in state.players) {
      const player = state.players[pid];
      
      players.push(<Dragon key={pid} player={player} />,)

      for(let fireball of state.players[pid].fireballs){
        fireballs.push(<FireballView key={fireball.id} fireball = {fireball}/>)
      }
      healthBars.push(<Bar key={v4()} x={state.players[pid].x - 35} y={state.players[pid].y-80} width={70} height={18} color ={0xe30b1d} coins={state.players[pid].coins} score={state.players[pid].score}/>)

      //fireballs.push(player.fireballs);
    }
    for(var i = 0; i < 8; i ++){
      fences.push(<BorderFence x={i*267+65} y={-60} angle={0}/>);
    }
    for(var i = 0; i < 8; i ++){
      fences.push(<BorderFence x={i*267+65} y={1060} angle={0}/>);
    }
    for(var i = 0; i < 5; i ++){
      fences.push(<BorderFence x={-60} y={i*267-30} angle={ Math.PI/2}/>);
    }
    for(var i = 0; i < 5; i ++){
      fences.push(<BorderFence x={2060} y={i*267-30} angle={Math.PI/2}/>);
    }
    //
    if (me !== null && this.viewport !=null) {
      this.viewport.x = -me.x * scale + window.innerWidth / 2;
      this.viewport.y = -me.y * scale + window.innerHeight / 2;
    }
    
    for(let cid in state.coins){
      //const coin = state.coins[cid];
      coins.push(<Coin key={cid} x={state.coins[cid].x} y={state.coins[cid].y}/>);
    }
    render(
      <>{coinJar}{fences}{coins}{players}{fireballs}{healthBars}</>, 
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
       <ReactNipple
                    options={{ color: '#c60c30', mode: 'dynamic', position: { bottom: '50%', right: '50%' } }}
                    style={{
                      position: 'fixed',
                      width: '100vw',
                      height: '100vh'
                    }}
                    onMove={(evt:any, data: any) => console.log(data.direction)}
                    />
       <ScrollDisable/>
                    <Leadboard>
                    </Leadboard>
       <div ref={(thisDiv) => {component.gameCanvas = thisDiv!}} />
       </>
     );
   }
}
