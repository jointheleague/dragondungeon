import { ColyseusService } from '../../lib/colyseus'
import { Room } from 'colyseus.js';
import { IGameState } from './types';

import { getAuth, onAuthStateChanged, User, signInAnonymously, updateProfile } from 'firebase/auth';
import { initializeApp } from 'firebase/app'

initializeApp({
  apiKey: "AIzaSyCRClPzTZnRSg_fAap6ENnAkxUBQKJGk5w",
  authDomain: "leaguedragoncoin.firebaseapp.com",
  projectId: "leaguedragoncoin",
  storageBucket: "leaguedragoncoin.appspot.com",
  messagingSenderId: "320692217416",
  appId: "1:320692217416:web:f9cd0efdc04445865e9a7d"
})

const auth = getAuth();

export class StateManager {
  room!: Room<IGameState>;

  constructor(
     private readonly colyseus: ColyseusService,
     private readonly lobby: string
   ) {}

  async getGameRoom() {
    onAuthStateChanged(auth, async user => {
      if (user) {
        let token = await user.getIdToken()
        await this.colyseus.client.joinOrCreate('game', { token }).then(room => {
          this.room = room as Room<IGameState>
        }).catch(console.warn)
      }
    })
  }

}
