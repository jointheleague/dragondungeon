import { ColyseusService } from '../../services/colyseus'
import { Room } from 'colyseus.js';
import {IGameState} from './types';
import firebase from 'firebase/app';
import 'firebase/auth';
import { navigate } from '@reach/router';
import randomItem from 'random-item';

export class StateManager {
  room!: Room<IGameState>;
  constructor(
     private readonly colyseus: ColyseusService,
     private readonly lobby: string
   ) {}

  async setup() {
    this.room = await this.getGameRoom();
  }

  currentUserPromise(): Promise<firebase.User> {
    return new Promise((resolve, reject) => {
      const currentUser = firebase.auth().currentUser;
      currentUser && resolve(currentUser);
      firebase.auth().onAuthStateChanged(user => user ? resolve(user) : reject());
    })
  }
  

  async getGameRoom(): Promise<Room> {
    var user;

    try {
      user = await this.currentUserPromise();
    } catch (error) {
      await firebase.auth().signInAnonymously();
      const adj = randomItem(require('../../wordlists/adjectives.json'));
      const noun = randomItem(require('../../wordlists/nouns.json'));
      const d1 = randomItem([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
      const d2 = randomItem([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
      const d3 = randomItem([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
      const d4 = randomItem([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
      user = await this.currentUserPromise();
      user.updateProfile({
        displayName: `${adj}${noun}${d1}${d2}${d3}${d4}`.toLowerCase()
      });
    }

      const options = {
        token: await user?.getIdToken(),
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

