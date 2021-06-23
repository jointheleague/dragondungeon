import React, { Component } from 'react';

import './countdown.scss';
import {IGameState, ICountdown} from 'game/state/types';
interface GameViewProps {
  state: IGameState;
}

interface CountdownProps {
  time: ICountdown
}

interface CountdownState {
  time: number;
}

class Countdown extends Component <CountdownProps, CountdownState>{

  render(){
    if(this.props.time.done){
      return <h2>Game Over</h2>
    }
    if(Math.floor(this.props.time.seconds) < 10){
      return <h2>{this.props.time.minutes} : 0{Math.floor(this.props.time.seconds)}</h2>
    }
    return <h2>{this.props.time.minutes} : {Math.floor(this.props.time.seconds)}</h2>
  }
}

export {Countdown}
