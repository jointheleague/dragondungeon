import React, { Component } from 'react'
import { StateManager } from '../state/StateManager'
import { Controls } from 'app/controls'
import { IInputs, Player } from 'common'
import { render } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'

import { Viewport } from 'pixi-viewport'

import { GameState } from 'common'
import { Dragon, TeamOrb } from './entities/dragon/index'
import { FireballView } from './entities/fireball'
import { MovingBackground } from './entities/movingBackground'
import { Wall } from './entities/wall'
import { Leaderboard } from 'components'
import router from 'next/router'

interface GameViewProps {
  stateManager: StateManager
  state: GameState
}

interface GameViewState {}

export class GameView extends Component<GameViewProps, GameViewState> {
  app!: PIXI.Application
  gameCanvas!: HTMLDivElement
  viewport!: Viewport

  /**
   * After mounting, add the Pixi Renderer to the div and start the Application.
   */
  componentDidMount() {
    this.app = new PIXI.Application({
      resizeTo: window,
      antialias: true,
      transparent: true,
    })
    this.gameCanvas!.appendChild(this.app.view)
    this.viewport = new Viewport()
    this.app.stage.addChild(this.viewport)
    this.app.start()
    this.app.ticker.add(() => this.renderScene())
  }

  renderScene() {
    let dragons = []
    let tiles = []
    let walls = []

    this.props.state.players.forEach(player => {
      dragons.push(<Dragon player={player} key={player.onlineID} team={0} />)
    })
    
    const id = this.props.stateManager.room.sessionId;
    const me = this.props.state.players[id];
    //moves the center of the viewport to the player 
    if (me !== null && this.viewport !== null) {
      try {
        this.viewport.x = -me.x * 1 + window.innerWidth / 2;
        this.viewport.y = -me.y * 1 + window.innerHeight / 2; 
      } catch (e) {
        console.error(e);
      }
    }

    var tileAmt = 19;
    var midpoint = this.props.state.gamewidth / 2;
    console.log(midpoint);
    for(var i = 0; i < tileAmt; i++){
      for(var j = 0; j < tileAmt; j++){
        if (typeof(me) !== "undefined") {
          tiles.push(<MovingBackground key={`${i}-${j}`} x={(me.x - midpoint)/2 + i*177*1.2 -(177*1.2*5)/7} y={ (me.y - midpoint)/2 + j*177*1.2 -(177*1.2*5)/7}/>);
        }
      }
    }

    const xLen = 20.26;
    const yLen = 30;
    //outer
    for(var i = 0; i < 150; i++){
      walls.push(<Wall x={i*xLen - yLen} y={-yLen} xLength ={xLen} yLength = {yLen} angle = {0} />)
      walls.push(<Wall x={i*xLen - yLen} y={this.props.state.gameheight} xLength ={xLen} yLength = {yLen} angle = {0} />)
      walls.push(<Wall x={0} y={i*xLen} xLength ={xLen} yLength = {yLen} angle = {Math.PI/2} />)
      walls.push(<Wall x={this.props.state.gamewidth + yLen} y={i*xLen} xLength ={xLen} yLength = {yLen} angle = {Math.PI/2} />)
    }    
    //top right
    walls.push(<Wall x={this.props.state.gamewidth/2 + 240} y={this.props.state.gameheight/2 - 240} xLength ={xLen} yLength = {yLen} angle = {-Math.PI/2} />)
    walls.push(<Wall x={this.props.state.gamewidth/2 + 240} y={this.props.state.gameheight/2 - 280} xLength ={xLen} yLength = {yLen} angle = {0} />)
    //bottom right
    walls.push(<Wall x={this.props.state.gamewidth/2 + 240} y={this.props.state.gameheight/2 + 240} xLength ={xLen} yLength = {yLen} angle = {0}/>)
    walls.push(<Wall x={this.props.state.gamewidth/2 + 280} y={this.props.state.gameheight/2 + 240} xLength ={xLen} yLength = {yLen} angle = {Math.PI/2}/>)
    //bottom left
    walls.push(<Wall x={this.props.state.gamewidth/2 - 240} y={this.props.state.gameheight/2 + 280} xLength ={xLen} yLength = {yLen} angle = {Math.PI}/>)
    walls.push(<Wall x={this.props.state.gamewidth/2 - 240} y={this.props.state.gameheight/2 + 240} xLength ={xLen} yLength = {yLen} angle = {Math.PI/2}/>)
    //top left
    walls.push(<Wall x={this.props.state.gamewidth/2 - 240} y={this.props.state.gameheight/2 - 240} xLength ={xLen} yLength = {yLen} angle = {Math.PI}/>)
    walls.push(<Wall x={this.props.state.gamewidth/2 - 280} y={this.props.state.gameheight/2 - 240} xLength ={xLen} yLength = {yLen} angle = {-Math.PI/2}/>)

    render(
      <>{ tiles }{ dragons }{ walls }</>,
      this.viewport
    )
  }

  /**
   * Stop the Application when unmounting.
   */
  componentWillUnmount() {
    this.app.stop()
  }

  actionCallback(v: IInputs) {
    this.props.stateManager.room?.send('input', v)
  }

  /**
   * Simply render the div that will contain the Pixi Renderer.
   */
  render() {
    let component = this
    return (
      <>
        <Controls
          actionCallback={(v: IInputs) => this.actionCallback(v)}
          viewport={this.viewport}
        />
        <div style={{ marginLeft: '3vw', display: 'flex' }}>
        <Leaderboard players={this.props.state.players} countdown={this.props.state.countdown}></Leaderboard>
        </div>
        <div
          ref={(thisDiv) => {
            component.gameCanvas = thisDiv!
          }}
        />
      </>
    )
  }
}
