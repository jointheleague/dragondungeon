import React, { Component } from 'react';

import './leaderboard.scss';
import {IGameState, IPlayer} from 'game/state/types';

interface QuitbuttonProps {
  players: {[key: string]: IPlayer}
  me: string;
}

class Quitbutton extends Component <QuitbuttonProps>
{

  render() {  
    const newArr = [];
    for(let pid in this.props.players){
      newArr.push(this.props.players[pid]);
    }

    newArr.sort((a:IPlayer,b:IPlayer)=>b.score-a.score);

    var size = (newArr.pop()?.score || this.props.players[this.props.me].score) / this.props.players[this.props.me].score; 

    size *= 10;

    return (
      <div className="leaderboard-box" >
          <table id='students'>
            
          </table>
      </div>
    )
  }
}

export { Quitbutton }
