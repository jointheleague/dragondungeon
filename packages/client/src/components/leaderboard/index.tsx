import React, { Component } from 'react';

import { Box } from "../box";
import './leaderboard.scss';
import {IGameState, IPlayer, ICountdown} from 'game/state/types';

interface GameViewProps {
  state: IGameState;
}

interface LeaderboardProps {
  p: {[key: string]: IPlayer}
  t: ICountdown
}

interface Ranking {
  onlineName: string;
  score: number;
  ballType: string;
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
    let name = ranking.onlineName;
    const ballType = ranking.ballType;

    if(name == null){name = "unNamed"}
     return (
        <tr key={index}>
            <td className="playerData"><img src={`/${ballType}ball.png`} style={{ height: '30px' }} /></td>
           <td className="playerData">{name}</td>
           <td className="playerData"><b><big>{score}</big></b></td>
        </tr>
     )
  })
}

renderMobileTableData(ranking:Ranking[]) {

  return ranking.map((ranking: Ranking, index:any) => {
    const score = ranking.score;
    let name = ranking.onlineName;
     return (
        <span key={index} style={{ color: 'white' }}>
           <span className="playerData">{name}</span>&nbsp;&nbsp;
           <b className="playerData" style={{ fontSize: '25px' }}>{score}</b>
        </span>
     )
  })
}

renderCountdown(){
  if(this.props.t.done){
    return <h2>Game Over</h2>
  }
  
  if(this.props.t.minutes === 0){
    if(Math.floor(this.props.t.seconds) <= 30){
      if(Math.floor(this.props.t.seconds) <= 10){
        return <h1 style={{color:'red', fontSize:'50px', marginTop:'20px'}}>{Math.floor(this.props.t.seconds)}</h1>
      }
      return <h1 style={{color:'orange'}}>{Math.floor(this.props.t.seconds)}</h1>
    }
    return <h2>0:{Math.floor(this.props.t.seconds)}</h2>
  }

  if(Math.floor(this.props.t.seconds) < 10){
    return <h2>{this.props.t.minutes}:0{Math.floor(this.props.t.seconds)}</h2>
  }
  return <h2>{this.props.t.minutes}:{Math.floor(this.props.t.seconds)}</h2>
}

renderClock() {
  return <h3>{new Date().toLocaleTimeString()}</h3>
}

render() {  
  const newArr = [];
  for(let pid in this.props.p){
    newArr.push(this.props.p[pid]);
  }

  newArr.sort((a:IPlayer,b:IPlayer)=>b.score-a.score);


  return (
    <>
      { (window.innerWidth >= 1000) && <div className="leaderboard-box" >
        <h1>Dragon Dungeon</h1>
        <h2>{this.renderCountdown()}</h2>
        <h3>{window.location.pathname.replace('/play/', '')}</h3>
        <h3>{this.renderClock()}</h3>
        <table>
          <tbody id='leaderboard'>
            {this.renderTableData(newArr)}
          </tbody>
        </table>
      </div> }

    { (window.innerWidth <= 1000) && <>
      <p className="mobileCountdown">{this.renderCountdown()}</p>
      <Box>
        { this.renderMobileTableData(newArr) }
      </Box>
    </> }
  </>
  )
}

}

export { Leaderboard }
