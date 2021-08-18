import React, { Component, lazy, Suspense } from 'react';
import { Router, } from '@reach/router';
import { ColyseusService } from 'services/colyseus';

const Game = lazy(() => import('./scenes/Game'));
const Credits = lazy(() => import('./scenes/Credits'));
const StartScreen = lazy(() => import("./scenes/StartScreen"));
const Home = lazy(() => import("./scenes/Home"));
const ErrorRoute = lazy(() => import("./scenes/ErrorRoute"));
const MyDragon = lazy(() => import("./scenes/MyDragon"));
const Tutorial = lazy(() => import("./scenes/Tutorial"));
const GameOver = lazy(() => import("./scenes/GameOver"));
const VideoCutscene = lazy(() => import("./scenes/Cutscene"));

interface IProps {}

class App extends Component {
  colyseus: ColyseusService;
  constructor(props: IProps) {
    super(props)

    const protocol = window.localStorage.protocol || (window.location.protocol.includes('https') ? 'wss' : 'ws') || 'wss';

    this.colyseus = new ColyseusService(
      protocol,
      window.localStorage.server || `${window.location.hostname}:8001`,
    );
  }
  render() {
    return (
      <Suspense fallback={(
        <></>
      )}>
        <Router>
          <Game colyseus={this.colyseus} roomId="random" path="/play/random" />
          <Game colyseus={this.colyseus} path="/play/:roomId" />
          <Credits path="/credits" />
          <StartScreen path="/" />
          <Home path="/home" />
          <MyDragon path="/mydragon" />
          <Tutorial path="/tutorial" />
          <GameOver path="/gameover" />
          <VideoCutscene path="/story" />
          <ErrorRoute default />
        </Router>
        <h2 style={{
          position: 'absolute',
          bottom: '0px',
          right: '0px',
          padding: '20px',
        }}>
          DragonCoin Alpha<br />
          {window.location.hostname}<br />
          {navigator.vendor} - {navigator.productSub}
        </h2>
      </Suspense>
    );
  }
}

export default App;
