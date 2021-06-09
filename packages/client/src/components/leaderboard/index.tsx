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
     //const { player } = student //destructuring
     const score = ranking.score;
    var name = ranking.onlineName;
    if(name == null){name = "unNamed"}
     return (
        <tr key={index}>
           <td>{name}</td>
           <td>{score}</td>
        </tr>
     )
  })
}
renderTableHeader() {
  let header = (["Name "," Score"])
  return header.map((key, index) => {
     return <th key={index}>{key.toUpperCase()}</th>
  })
}
render() {
  // compute the current ranking based on this.props.p
  
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
export {Leaderboard}






const FOCUSED: CSSProperties = {
  border: 'solid #375a7f 2px',
  textAlign: 'center',
  margin: 'auto',
  width:'100%',
};
/*
export function Leadboard(props: {
  style?: CSSProperties;
  children: ReactNode;
  players: IPlayer;
}): React.ReactElement {
  const {
    style,
    children,
  } = props;
  return <div style={style} className="container-box">{children}
    <table style={FOCUSED}>
      <tbody>
        <tr style={FOCUSED}>
          <th>
            name
          </th>
          <th>
            coins
          </th>
        </tr>
        <tr style={FOCUSED}>
          <td>
            Dave
          </td>
          <td>
            500
          </td>
        </tr>
      </tbody>
    </table>
  </div>
}
*/