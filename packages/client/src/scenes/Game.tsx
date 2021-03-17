import React, { Component, ReactNode } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';

import { StateManager } from '../game/state/StateManager';
import { CoreView } from '../game/view/CoreView';
import { ColyseusService } from '@dragoncoin/client/src/services/colyseus'

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
        navigate(`/play/${this.stateManager.room.id}`);
      })
      .catch((e) => {
        navigate("/");
        show_error_banner('ERROR CODE: FISH (Matchmake/NoServer)');
      })
  }

  componentWillUnmount() {
    this.stateManager.room?.leave(true);
  }

  render(): ReactNode {
    if (this.state.loading) {
      return (
        <>
          <br /><br /><br />
          <p style={{ textAlign: 'center' }}>Loading...</p>
        </>
      )
    }
    return <CoreView stateManager={this.stateManager}/>
  }

}
