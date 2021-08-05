import React, {useEffect, useState, Component} from 'react';
import { Box, Space, Center, Button } from '../components';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, getDoc, doc, limit } from 'firebase/firestore/lite';
import { navigate } from '@reach/router';
import DOMPurify from 'dompurify';
import { StateManager } from '../game/state/StateManager';
import { IGameState, IPlayer } from '../game/state/types';

const homepage = () => {
  navigate('/home');
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
}

interface Ranking {
  onlineName: string;
  score: number;
}

const GameOver = (props: IProps) => {

  const players = props.state.players;

  const id = props.stateManager.id;
  const me = players[id];



  return (
    <>
      <br /><br /><br />
      <Center>
        <Space size='xl'/>
        <Box>
          <h1 style={{ textAlign: 'center', fontSize: '40px', fontWeight: 'bold' }}>Game Over</h1>
        </Box>
        <Space size='m'/>
        <h1>Score : {me.score}</h1>
        <h3 style={{marginTop:'0px'}}> Hits Dealt : {me.hitsDealt}</h3>
        <h3 style={{marginTop:'0px'}}> Hits Recived : {me.hitsRecived}</h3>
        <h3 style={{marginTop:'0px', marginBottom:'0px'}}> Coins picked up : {me.coinsPickedUp}</h3>
        <Space size='m'/>
        <h1>Leaderboard</h1>
        <GameOverLeaderboard p={players}/>
        
        <Space size='m'/>
        <h1>Your Past Top Scores </h1>
        <h2>(needs to be implemented in firebase)</h2>
        <ul className="scores" style={{marginTop:'0px'}}>
          <li>154</li>
          <li>120</li>
          <li>55</li>
          <li>21</li>
        </ul>

        <Space size='m'/>
        <Button onClick={homepage} text="Home" />
      </Center>
      <p style={{height:'9999999px'}}></p>
      <Center>
        <h1>Top Score Ever</h1>
        <ul className="scores" style={{marginTop:'0px'}}>
          <li >999,999,999</li>
          <li><a href="https://www.poetryfoundation.org/poems/46565/ozymandias" target="_blank" rel="noopener"> Look on my Works, ye Mighty, and despair!</a></li>
        </ul>
      </Center>
      <Space size='giant'/>
    </>
  );
}

export default GameOver;
