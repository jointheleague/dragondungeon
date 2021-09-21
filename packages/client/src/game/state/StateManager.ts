import { ColyseusService } from '../../services/colyseus'
import { Room } from 'colyseus.js';
import { IGameState } from './types';

import { getAuth, onAuthStateChanged, User, signInAnonymously, updateProfile } from 'firebase/auth';

const auth = getAuth();

export class StateManager {
  room!: Room<IGameState>;

  constructor(
     private readonly colyseus: ColyseusService,
     private readonly lobby: string
   ) {}

  async setup() {
    this.room = await this.getGameRoom();
  }

  currentUserPromise(): Promise<User> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, user => user ? resolve(user) : reject());
    })
  }

  async getGameRoom(): Promise<Room> {
    var user;

    try {
      user = await this.currentUserPromise();
    } catch (error) {
      await signInAnonymously(auth);
      user = await this.currentUserPromise();
    }

      const options = {
        token: await user?.getIdToken(),
      }
  
      if (this.lobby === 'new') {
        return await this.colyseus.client.create('game', options)
      } else if (this.lobby === 'random') {
        return await this.colyseus.client.joinOrCreate('game', options)
      } else if (this.lobby === 'tutorial') {
        return await this.colyseus.client.joinOrCreate('tutorial', options)
      } else {
        return await this.colyseus.client.joinById(this.lobby, options)
      }
  }

  get id(){
    return this.room.sessionId;
  }

}

