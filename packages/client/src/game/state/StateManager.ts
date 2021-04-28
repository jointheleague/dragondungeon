import { ColyseusService } from '../../services/colyseus'
import { Room } from 'colyseus.js';
import {IGameState} from './types';
import firebase from 'firebase/app';
import 'firebase/auth';

export class StateManager {
  room!: Room<IGameState>;
  constructor(
     private readonly colyseus: ColyseusService,
     private readonly lobby: string
   ) {}

  async setup() {
    this.room = await this.getGameRoom();
  }

  async getGameRoom(): Promise<Room> {
    const options = {
      token: await firebase.auth().currentUser?.getIdToken(),
    }

    if (this.lobby === 'new') {
      return await this.colyseus.client.create('game', options)
    } else if (this.lobby === 'random') {
      return await this.colyseus.client.joinOrCreate('game', options)
    } else {
      return await this.colyseus.client.joinById(this.lobby, options)
    }
  }
  get id(){
    return this.room.sessionId;
  }

}

