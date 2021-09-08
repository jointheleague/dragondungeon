import React, { Component, lazy, Suspense } from 'react';
import { Router, } from '@reach/router';
import { ColyseusService } from 'services/colyseus';

const Game = lazy(() => import('./scenes/Game'));
const Credits = lazy(() => import('./scenes/Credits'));
const StartScreen = lazy(() => import("./scenes/StartScreen"));
const ErrorRoute = lazy(() => import("./scenes/ErrorRoute"));
const MyDragon = lazy(() => import("./scenes/MyDragon"));
const StoryContent = lazy(() => import("./scenes/Cutscene"));
const Tutorial = lazy(() => import("./scenes/Tutorial"));

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
          <MyDragon path="/mydragon" />
          <StoryContent path="/story" />
          <Tutorial path="/tutorial" />
          <ErrorRoute default />
        </Router>
      </Suspense>
    );
  }
}

export default App;
