import React, { Component } from 'react';
import { Box, Space, Button } from '../../components';
import { StateManager } from '../state/StateManager';
import { IGameState, IPlayer } from '../state/types';

let gameOverMusic: HTMLAudioElement;

const homepage = () => {
  gameOverMusic.pause();
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

class GameOverLeaderboard extends Component <LeaderboardProps, LeaderboardState>
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
           <td className="playerData">{name}</td>
           <td className="playerData">{score}</td>
        </tr>
     )
  })
}

renderTableHeader() {
  let header = (["Name","Score"])
  return header.map((key, index) => {
     return <th key={index}>{key.toUpperCase()}</th>
  })
}

render() {
  gameOverMusic = new Audio('/audio/gameover.mp3');  
  const newArr = [];
  for(let pid in this.props.p){
    newArr.push(this.props.p[pid]);
  }

  newArr.sort((a:IPlayer,b:IPlayer)=>b.score-a.score);


  return (
    <table id='students'>
      <tbody id='leaderboard'>
        <tr>{this.renderTableHeader()}</tr>
        {this.renderTableData(newArr)}
      </tbody>
    </table>
  )
}
}

export { GameOverLeaderboard }


interface IProps {
  stateManager: StateManager;
  state: IGameState;
  music: HTMLAudioElement;
}

interface Ranking {
  onlineName: string;
  score: number;
}

const GameOver = (props: IProps) => {

  const players = props.state.players;

  const gameMusic = props.music;

  const id = props.stateManager.id;
  const me = players[id];

  gameMusic.pause();

  gameOverMusic.loop = true;
  gameOverMusic.play();



  return (
    <div style={{ padding: '30px' }}>
      <Box>
        <h1>Game Over</h1>
      </Box>
      <h1>+{me.score} <img src="/icon.png" height="30px" style={{ imageRendering: 'pixelated', verticalAlign: 'middle' }} /></h1>
      <h3 style={{marginTop:'0px'}}> Hits Dealt: {me.hitsDealt}</h3>
      <h3 style={{marginTop:'0px'}}> Hits Recived: {me.hitsRecived}</h3>
      <h3 style={{marginTop:'0px', marginBottom:'0px'}}> Coins picked up: {me.coinsPickedUp}</h3>
      <Space size='m'/>
      <h1>Leaderboard</h1>
      <GameOverLeaderboard p={players}/>

      <Space size='m'/>
      <Button onClick={homepage} text="Home" />
    </div>
  );
}

export default GameOver;
