import React, { Component, lazy, Suspense } from 'react';
import { Router, } from '@reach/router';
import { ColyseusService } from 'services/colyseus';

const Game = lazy(() => import('./scenes/Game'));
const Home = lazy(() => import("./scenes/Home"));
const ErrorRoute = lazy(() => import("./scenes/ErrorRoute"));
const Profile = lazy(() => import("./scenes/Profile"));
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
        <>
          <br /><br /><br />
          <p style={{ textAlign: 'center' }}>Loading...</p>
        </>
      )}>
        <Router>
          <Game colyseus={this.colyseus} roomId="random" path="/play/random" />
          <Game colyseus={this.colyseus} path="/play/:roomId" />
          <Home path="/"/>
          <Profile path="/profile"/>
          <Tutorial path="/tutorial"/>
          <GameOver path="/gameover"/>
          <VideoCutscene path="/story" />
          <ErrorRoute default/>
        </Router>
      </Suspense>
    );
  }
}

export default App;
