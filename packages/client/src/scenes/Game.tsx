import React, { Component, ReactNode } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';

import { StateManager } from '../game/state/StateManager';
import { CoreView } from '../game/view/CoreView';
import { ColyseusService } from '@dragondungeon/client/src/services/colyseus'

import { show_error_banner } from '../util/banner';


interface IProps extends RouteComponentProps {
  colyseus: ColyseusService
  roomId?: string
}

interface IState {
  loading: boolean;
}

export default class Game extends Component<IProps, IState>{
  stateManager: StateManager;

  state = {
    loading: true
  };

  constructor(props: IProps) {
    super(props)
    this.stateManager = new StateManager(this.props.colyseus, this.props.roomId || 'new')
  }

  componentDidMount() {
    this.stateManager.setup()
      .then(() => {
        this.setState({loading: false});
        window.history.replaceState(null, 'dragondungeon', `/play/${this.stateManager.room.id}`);
      })
      .catch((e) => {
        if (e.toString().startsWith("Error: Room")) {
          navigate('/');
          show_error_banner('Room Not Found');
        } else {
          window.location.reload();
        }
      })
  }

  componentWillUnmount() {
    this.stateManager.room?.leave(true);
  }

  render(): ReactNode {
    if (this.state.loading) {
      return (
        <div style={{ textAlign: 'center' }}>
          <br /><br /><br />
          <img style={{ textAlign: 'center', height: '150px', imageRendering: 'pixelated' }} src="/basicDragon.png" />
        </div>
      )
    }
    return (
      <>
        <CoreView stateManager={this.stateManager}/>
      </>
    )
  }

}
