import React, { Component } from 'react'
import { StateManager } from '../state/StateManager'
import { Controls } from '../controls'
import { IInputs, Player } from '../../common'
import { render } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'

import { Viewport } from 'pixi-viewport'

import { GameState } from '../../common'
import { Dragon, TeamOrb } from './entities/dragon/index'
import { FireballView } from './entities/fireball'

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
    this.props.state.players.forEach(player => {
      player.x = 100
      player.y = 100
      dragons.push(<Dragon player={player} key={player.onlineID} team={0} />)
    })

    render(
      <>{ dragons }</>,
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
          {/* <Leaderboard p={this.props.stateManager.room.state.players} t={this.props.state.countdown}></Leaderboard> */}
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
