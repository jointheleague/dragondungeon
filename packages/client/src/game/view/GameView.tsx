import React, { Component } from 'react';
import { StateManager } from '../state/StateManager';
import { useDisableScroll } from '../../hooks';
import {Controls} from '../controls';
import {IInputs} from '../controls/types';
import { Dragon } from './entities/dragon/index';
import { render } from "react-pixi-fiber";
import {FireballView} from './entities/fireball/index';
import {IceballView} from './entities/iceball/index';
import * as PIXI from 'pixi.js';
import { Coin } from './entities/coin';
import { CoinJar } from './entities/coinJar';
import { BorderFence } from './entities/borderFence';
import { Wall } from './entities/wall';
import { MovingBackground } from './entities/movingBackground';
import {IGameState} from '../state/types';
import { Viewport } from "pixi-viewport";
import { Leaderboard } from 'components/leaderboard';
import { Countdown } from 'components/countdown';
import ReactNipple from 'react-nipple';
import {Bar} from './entities/healthBar/healthBar';
import { v4 } from "uuid";
import { show_error_banner } from 'util/banner';

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
    const leaderboard = [];
    const players = [];
    const coins = [];
    const fireballs = [];
    const healthBars = [];
    const fences = [];
    const tiles = [];
    const walls = [];
    const coinJar = <CoinJar key={"only"} x={1000} y={1000}/>;
    const id  = this.props.stateManager.id
    const me = this.props.state.players[id];
    
    for (let pid in state.players) {
      const player = state.players[pid];

      // TODO: Use player name/id for stuff

      players.push(<Dragon key={pid} player={player} />,)

      for(let fireball of state.players[pid].fireballs){

        fireballs.push(<IceballView key={fireball.id} iceball={fireball}/>)

      }
      healthBars.push(<Bar key={v4()} x={state.players[pid].x - 35} y={state.players[pid].y - 80} width={70} height={18} color ={0xe30b1d} coins={state.players[pid].coins} name={state.players[pid].onlineName}/>)
      //println("fs");
      //fireballs.push(player.fireballs);
      leaderboard.push(Leaderboard )
    }
    for(var i = 0; i < 8; i++){
      fences.push(<BorderFence x={i*267+60} y={-76} angle={0} key={`fence1${i}`} />);
      fences.push(<BorderFence x={i*267+60} y={2076} angle={0} key={`fence2${i}`} />);
      fences.push(<BorderFence x={-76} y={i*267+60} angle={Math.PI/2} key={`fence3${i}`} />);
      fences.push(<BorderFence x={2076} y={i*267+60} angle={Math.PI/2} key={`fence4${i}`} />);
    }
    const xLen = 400;
    const yLen = 40;
    //top right
    walls.push(<Wall x={1240} y={760} xLength ={xLen} yLength = {yLen} angle = {-Math.PI/2} />)
    walls.push(<Wall x={1240} y={720} xLength ={xLen} yLength = {yLen} angle = {0} />)
    //bottom right
    walls.push(<Wall x={1240} y={1240} xLength ={xLen} yLength = {yLen} angle = {0}/>)
    walls.push(<Wall x={1280} y={1240} xLength ={xLen} yLength = {yLen} angle = {Math.PI/2}/>)
    //bottom left
    walls.push(<Wall x={760} y={1280} xLength ={xLen} yLength = {yLen} angle = {Math.PI}/>)
    walls.push(<Wall x={760} y={1240} xLength ={xLen} yLength = {yLen} angle = {Math.PI/2}/>)
    //top left
    walls.push(<Wall x={760} y={760} xLength ={xLen} yLength = {yLen} angle = {Math.PI}/>)
    walls.push(<Wall x={720} y={760} xLength ={xLen} yLength = {yLen} angle = {-Math.PI/2}/>)

    //
    if (me !== null && this.viewport !=null) {
      try {
        this.viewport.x = -me.x * scale + window.innerWidth / 2;
        this.viewport.y = -me.y * scale + window.innerHeight / 2; 
      } catch {
        show_error_banner('RAT');
      }
    }
    var tileAmt = 16;
    var midpoint = (tileAmt*177)/2;
    for(var i = 0; i < tileAmt; i++){
      for(var j = 0; j < tileAmt; j++){
          tiles.push(<MovingBackground key={`${i}-${j}`} x={(me.x - midpoint)/2 + i*177 -(177*5)/7} y={ (me.y - midpoint)/2 + j*177 -(177*5)/7}/>);
      }
    }
    for(let cid in state.coins){
      //const coin = state.coins[cid];
      coins.push(<Coin key={cid} x={state.coins[cid].x} y={state.coins[cid].y} size={state.coins[cid].size}/>);
    }
    render(
      <>{tiles}{coinJar}{fences}{coins}{players}{fireballs}{healthBars}{walls}</>, 
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
          onMove={(evt:any, data: any) => console.log(data.direction)}/>
       <ScrollDisable/>
          <div style={{marginLeft : '3vw'}}>
            <Leaderboard p={this.props.stateManager.room.state.players} t={this.props.state.countdown}></Leaderboard>
          </div>
       <div ref={(thisDiv) => {component.gameCanvas = thisDiv!}} />
       </>
     );
   }
}
