import React, { Component } from 'react';

import './leaderboard.scss';
import {IGameState, IPlayer} from 'game/state/types';
interface GameViewProps {
  state: IGameState;
}
interface LeaderboardProps {
  p: {[key: string]: IPlayer}
}

interface Ranking {
  onlineName: string;
  score: number;
}
interface LeaderboardState {
  rankings: Ranking[];
}
class Leaderboard extends Component <LeaderboardProps, LeaderboardState>
{
  state: LeaderboardState;
  constructor(props: LeaderboardProps) {
    super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = { //state is by default an object
       rankings:[]
    }
 }
 renderTableData(ranking:Ranking[]) {

  return ranking.map((ranking: Ranking, index:any) => {
    const score = ranking.score;
    var name = ranking.onlineName;

    if(name == null){name = "unNamed"}
     return (
        <tr key={index}>
           <td>{name}</td>
           <td className="score">{score}</td>
        </tr>
     )
  })
}

renderTableHeader() {
  let header = (["Name","Coins"])
  return header.map((key, index) => {
     return <th key={index}>{key.toUpperCase()}</th>
  })
}

render() {  
  const newArr = [];
  for(let pid in this.props.p){
    newArr.push(this.props.p[pid]);
  }

  newArr.sort((a:IPlayer,b:IPlayer)=>b.score-a.score);


  return (
     <div className="leaderboard-box" >
        <table id='students'>
           <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData(newArr)}
           </tbody>
        </table>
     </div>
  )
}
}

export { Leaderboard }
