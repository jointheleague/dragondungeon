import React, { Component } from 'react';
import { StateManager } from '../state/StateManager';
import { Controls } from '../controls';
import { IInputs } from '../controls/types';
import { Dragon } from './entities/dragon/index';
import { render } from "react-pixi-fiber";
import { FireballView } from './entities/fireball/index';
import * as PIXI from 'pixi.js';
import { Coin } from './entities/coin';
import { CoinJar } from './entities/coinJar';
import { Bat } from './entities/bat';
import { Skull } from './entities/skull';
import { Wall } from './entities/wall';
import { MovingBackground } from './entities/movingBackground';
import { IGameState} from '../state/types';
import { Viewport } from "pixi-viewport";
import { Leaderboard } from '../../components/leaderboard';
import { Bar } from './entities/healthBar/healthBar';
import { v4 } from "uuid";

interface GameViewProps {
  stateManager: StateManager;
  state: IGameState;
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
     
    this.props.stateManager.room.onMessage('hint', message => {
      console.log("hint: " + message);
    });
   }

   renderScene() {
    //initialize arrays of all rendered objects
    const state = this.props.state;
    const leaderboard = [];
    const players = [];
    const coins = [];
    const fireballs = [];
    const healthBars = [];
    const tiles = [];
    const walls = [];
    const bats = [];
    const skulls = [];
    const coinJar = <CoinJar key={"only"} x={state.gamewidth/2} y={state.gameheight/2} team={state.coinJar.team}/>;
    //gets the id for the user and their dragon
    const id  = this.props.stateManager.id;
    const me = this.props.state.players[id];
    //moves the center of the veiwport to the player 
    if (me !== null && this.viewport !== null) {
      try {
        this.viewport.x = -me.x * 1 + window.innerWidth / 2;
        this.viewport.y = -me.y * 1 + window.innerHeight / 2; 
      } catch {
        console.log('Rendering Failed');
      }
    }
    //push each player's: dragon, healthbar, and fireballs to be rendered and add them to the leaderboard
    for (let pid in state.players) {
      const player = state.players[pid];
      players.push(<Dragon key={pid} player={player} team={state.players[pid].team}/>,)
      for(let fireball of state.players[pid].fireballs){
        fireballs.push(<FireballView key={fireball.id} fireball={fireball} />)
      }
      healthBars.push(<Bar key={v4()} x={state.players[pid].x - 35} y={state.players[pid].y - 80} width={70} height={18} color ={0xe30b1d} coins={state.players[pid].coins} name={state.players[pid].onlineName}/>) 
      leaderboard.push(Leaderboard)
    }
    //push all bats to be rendered
    for(let bid in state.bats){
      bats.push(<Bat x={state.bats[bid].x} y={state.bats[bid].y} rot={state.bats[bid].angle} key={bid}/>)
    }
    //push all skulls to be rendered
    for(let sid in state.skulls){
      bats.push(<Skull x={state.skulls[sid].x} y={state.skulls[sid].y} rot={state.skulls[sid].angle} key={sid}/>)
    }
    //push all coins to be rendered
    for(let cid in state.coins){
      //const coin = state.coins[cid];
      coins.push(<Coin key={cid} x={state.coins[cid].x} y={state.coins[cid].y} size={state.coins[cid].size} team={state.coins[cid].team}/>);
    }

    for(let wid in state.walls){
      const wall = state.walls[wid];
      walls.push(<Wall x={wall.x} y={wall.y} xLength={wall.xLength} yLength={wall.yLength} angle={wall.angle}/>)
    }
    //adds a background of random ([ly] chosen at begining) tiles to move with the player
    var tileAmt = 19;
    var midpoint = state.gamewidth/2;
    console.log(midpoint);
    for(var i = 0; i < tileAmt; i++){
      for(var j = 0; j < tileAmt; j++){
        if (typeof(me) !== "undefined") {
          tiles.push(<MovingBackground key={`${i}-${j}`} x={(me.x - midpoint)/2 + i*177*1.2 -(177*1.2*5)/7} y={ (me.y - midpoint)/2 + j*177*1.2 -(177*1.2*5)/7}/>);
        }
      }
    }
    //push walls to be rendered
    if(state.gamemode === "FFA"){
      const xLen = 455.625;
      const xLen2 = 275.625;
      const xLen3 = 185.625;
      const yLen = 39.375; 
      //outer
      for(var i = 0; i < 9; i++){
        walls.push(<Wall x={i*xLen - yLen} y={-yLen} xLength ={xLen} yLength = {yLen} angle = {0} />)
        walls.push(<Wall x={i*xLen - yLen} y={state.gameheight} xLength ={xLen} yLength = {yLen} angle = {0} />)
        walls.push(<Wall x={0} y={i*xLen} xLength ={xLen} yLength = {yLen} angle = {Math.PI/2} />)
        walls.push(<Wall x={state.gamewidth + yLen} y={i*xLen} xLength ={xLen} yLength = {yLen} angle = {Math.PI/2} />)
      }    
      //top right
      walls.push(<Wall x={state.gamewidth/2 + 240} y={state.gameheight/2 - 240} xLength ={xLen} yLength = {yLen} angle = {-Math.PI/2} />)
      walls.push(<Wall x={state.gamewidth/2 + 240} y={state.gameheight/2 - 280} xLength ={xLen} yLength = {yLen} angle = {0} />)
      //bottom right
      walls.push(<Wall x={state.gamewidth/2 + 240} y={state.gameheight/2 + 240} xLength ={xLen} yLength = {yLen} angle = {0}/>)
      walls.push(<Wall x={state.gamewidth/2 + 280} y={state.gameheight/2 + 240} xLength ={xLen} yLength = {yLen} angle = {Math.PI/2}/>)
      //bottom left
      walls.push(<Wall x={state.gamewidth/2 - 240} y={state.gameheight/2 + 280} xLength ={xLen} yLength = {yLen} angle = {Math.PI}/>)
      walls.push(<Wall x={state.gamewidth/2 - 240} y={state.gameheight/2 + 240} xLength ={xLen} yLength = {yLen} angle = {Math.PI/2}/>)
      //top left
      walls.push(<Wall x={state.gamewidth/2 - 240} y={state.gameheight/2 - 240} xLength ={xLen} yLength = {yLen} angle = {Math.PI}/>)
      walls.push(<Wall x={state.gamewidth/2 - 280} y={state.gameheight/2 - 240} xLength ={xLen} yLength = {yLen} angle = {-Math.PI/2}/>)
    }else if (state.gamemode === "CTC"){

    }


    render(
      <>{tiles}{coinJar}{walls}{coins}{players}{skulls}{bats}{fireballs}{healthBars}</>, 
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
            <Leaderboard p={this.props.stateManager.room.state.players} t={this.props.state.countdown}></Leaderboard>
          </div>
       <div ref={(thisDiv) => {component.gameCanvas = thisDiv!}} />
       </>
     );
   }
}
