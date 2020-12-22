import React, { Component, ReactNode } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import { Subscription } from 'rxjs';

import { StateManager } from '../game/state/StateManager';
import { CoreView } from '../game/view/CoreView';
import { ColyseusService } from '@bulletz/client/src/services/colyseus'

import { show_error_banner } from '../util/banner';

interface IProps extends RouteComponentProps {
  colyseus: ColyseusService
  roomId?: string
}

interface IState { }

export default class Game extends Component<IProps, IState>{
  stateManager: StateManager;
  historySubscription?: Subscription;

  constructor(props: IProps) {
    super(props)
    this.stateManager = new StateManager(this.props.colyseus, this.props.roomId || 'new')
  }

  componentDidMount() {

    this.stateManager.setup()
      .catch((e) => {
        navigate("/");
        show_error_banner(`Error joining lobby ${this.props.roomId} does not exist`)
        console.error(e);
      })

    this.historySubscription = this.stateManager
      .roomId
      .subscribe(id => {
        window.history.replaceState({}, "/play/random", "/play/" + id);
      });
  }

  componentWillUnmount() {
    if (this.historySubscription) {
      this.historySubscription.unsubscribe()
    }
    this.stateManager.room?.leave(true);
  }

  render(): ReactNode {
    return <CoreView stateManager={this.stateManager}/>
  }

}
