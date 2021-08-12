import React, { Component } from 'react';
import { StateManager } from '../state/StateManager';
import { useDisableScroll } from '../../hooks';
import { Controls } from '../controls';
import { IInputs } from '../controls/types';
import { Dragon } from './entities/dragon/index';
import { render } from "react-pixi-fiber";
import { FireballView } from './entities/fireball/index';
import * as PIXI from 'pixi.js';
import { Coin } from './entities/coin';
import { CoinJar } from './entities/coinJar';
import { Bat } from './entities/bat';
import { BorderFence } from './entities/borderFence';
import { Wall } from './entities/wall';
import { MovingBackground } from './entities/movingBackground';
import { IGameState} from '../state/types';
import { Viewport } from "pixi-viewport";
import { Leaderboard } from 'components/leaderboard';
//import { Countdown } from 'components/countdown';
import ReactNipple from 'react-nipple';
import { Bar } from './entities/healthBar/healthBar';
import { v4 } from "uuid";
import { show_error_banner } from 'util/banner';
import { navigate } from '@reach/router';
import { continueStatement } from '@babel/types';

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
    const tiles = [];
    const walls = [];
    const bats = [];
    const coinJar = <CoinJar key={"only"} x={1000} y={1000} team={state.coinJar.team}/>;
    const id  = this.props.stateManager.id
    const me = this.props.state.players[id];
    for (let pid in state.players) {
      const player = state.players[pid];
      //console.log("ball type in Gview, " + player.ballType);
      // TODO: Use player name/id for stuff
      
      players.push(<Dragon key={pid} player={player} team={state.players[pid].team}/>,)

      for(let fireball of state.players[pid].fireballs){
        fireballs.push(<FireballView key={fireball.id} fireball={fireball} />)
      }
      healthBars.push(<Bar key={v4()} x={state.players[pid].x - 35} y={state.players[pid].y - 80} width={70} height={18} color ={0xe30b1d} coins={state.players[pid].coins} name={state.players[pid].onlineName}/>)
      //println("fs");
      //fireballs.push(player.fireballs);
      leaderboard.push(Leaderboard)
    }

    console.log("at least reached in gameview");
    for(let bid in state.bats){
      console.log("bat displayed");
      bats.push(<Bat x={state.bats[bid].x} y={state.bats[bid].y} rot={0} key={bid}/>)
    }
    //</Bat>for(var i = 0; i < 4; i++){
    //  bats.push(<Bat x={1000 + (60*i + 60)*Math.cos(state.batRot)} y={1000 + (60*i + 60)*Math.sin(state.batRot)} rot={0}/>)
    //}


    const xLen = 455.625;
    const xLen2 = 275.625;
    const xLen3 = 185.625;
    const yLen = 39.375; 

    for(var i = 0; i < 4; i++){
      walls.push(<Wall x={i*xLen - yLen} y={-yLen} xLength ={xLen} yLength = {yLen} angle = {0} />)
      walls.push(<Wall x={i*xLen - yLen} y={2000} xLength ={xLen} yLength = {yLen} angle = {0} />)
      walls.push(<Wall x={0} y={i*xLen} xLength ={xLen} yLength = {yLen} angle = {Math.PI/2} />)
      walls.push(<Wall x={2000 + yLen} y={i*xLen} xLength ={xLen} yLength = {yLen} angle = {Math.PI/2} />)
    }

    walls.push(<Wall x={4*xLen - yLen} y={-yLen} xLength ={xLen2} yLength = {yLen} angle = {0} />)
    walls.push(<Wall x={4*xLen - yLen} y={2000} xLength ={xLen2} yLength = {yLen} angle = {0} />)
    walls.push(<Wall x={0} y={4*xLen} xLength ={xLen3} yLength = {yLen} angle = {Math.PI/2} />)
    walls.push(<Wall x={2000 + yLen} y={4*xLen} xLength ={xLen3} yLength = {yLen} angle = {Math.PI/2} />)

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
      coins.push(<Coin key={cid} x={state.coins[cid].x} y={state.coins[cid].y} size={state.coins[cid].size} team={state.coins[cid].team}/>);
    }
    render(
      <>{tiles}{coinJar}{walls}{coins}{players}{bats}{fireballs}{healthBars}</>, 
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
          <div style={{marginLeft : '3vw', display:'flex'}}>
            <Leaderboard p={this.props.stateManager.room.state.players} t={this.props.state.countdown}></Leaderboard>
          </div>
       <div ref={(thisDiv) => {component.gameCanvas = thisDiv!}} />
       </>
     );
   }
}
