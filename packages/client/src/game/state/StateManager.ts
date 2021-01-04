import { ColyseusService } from '../../services/colyseus'
import { Room } from 'colyseus.js';
import { BehaviorSubject, ReplaySubject, Observable } from 'rxjs';
import { filter, pairwise, map } from 'rxjs/operators';

import { Maths } from '@bulletz/common';

import { GameState, IPlayer } from './types';

type PlayerKeys = Array<keyof IPlayer>;

export function isLobbyRenderState(v: any): v is LobbyRenderState {
  return v && 'isLobbyState' in v;
}
export function isGameRenderState(v: any): v is GameRenderState {
  return v && 'isGameRenderState' in v;
}

export interface LobbyRenderState {
  isLobbyState: true;
  sessionId: string;
  players: { [key: string]: IPlayer };
  room: Room;
}

export interface GameRenderState {
  isGameRenderState: true;
  frame: number;
  players: { [key: string]: IPlayer };
}

function removeRoom(s1: any) {
  let { room, ...rest } = s1;
  return rest;
}

function stateCompare(s1: any, s2: any) {
  let rest = removeRoom(s1);
  let rest2 = removeRoom(s2);
  const str1 = JSON.stringify(rest)
  const str2 = JSON.stringify(rest2)
  return str1 !== str2;
}
function key_diff(a1: string[], a2: string[]) {

  let a: { [key: string]: boolean } = {};
  let diff = [];

  for (let i = 0; i < a1.length; i++) {
    a[a1[i]] = true;
  }

  for (let i = 0; i < a2.length; i++) {
    if (a[a2[i]]) {
      delete a[a2[i]];
    } else {
      a[a2[i]] = true;
    }
  }

  for (var k in a) {
    diff.push(k);
  }

  return diff;
}

function diffStates(states: RenderState[]): boolean {
  if (states.length !== 2) {
    throw new Error('diffStates must be called with [state1, state2]');
  }
  const [s1, s2] = states;
  //  console.log(s1, s2)
  // loading done state
  if (s1 == null) {
    return true;
  }

  // when in the lobby mode we only render when we get a difference in our deep compare
  if (isLobbyRenderState(s2)) {
    return stateCompare(s1, s2);
  }

  return true;
}

export type RenderState = LobbyRenderState | GameRenderState | null;

export class StateManager {
  room?: Room
  roomId: ReplaySubject<string>;

  clientState: GameState = null;
  serverState: GameState = null;

  rawStates$: BehaviorSubject<RenderState> = new BehaviorSubject<RenderState>(null);
  state$: Observable<RenderState> = this.rawStates$
    .pipe(
      pairwise(),
      filter(diffStates),
      map((arr) => arr[1])
    )

  constructor(private readonly colyseus: ColyseusService, private readonly lobby: string) {
    this.roomId = new ReplaySubject(1);
    const cb = () => {
      this.tick((Date).now())
      requestAnimationFrame(cb);
    }
    requestAnimationFrame(cb);
  }

  lastTick: number = (Date).now();
  async setup() {
    this.room = await this.getGameRoom();
    this.roomId.next(this.room.id);
    this.room.onStateChange(v => {
      this.serverState = v;
      this.tick((Date).now());
      this.rawStates$.next(this.getGameState());
    })
  }

  async getGameRoom(): Promise<Room> {
    const options = {
      name: localStorage.getItem('name'),
    }
    if (this.lobby === 'new') {
      return await this.colyseus.client.create('game', options)
    } else if (this.lobby === 'random') {
      return await this.colyseus.client.joinOrCreate('game', options)
    } else {
      return await this.colyseus.client.joinById(this.lobby, options)
    }
  }

  stateCopy(gs: GameState): GameState {
    if (gs == null) {
      return null;
    }

    return {
      lifecycle: gs.lifecycle,
      players: {}
    }
  }


  tick(time: number) {
    const dx = time - this.lastTick;
    this.lastTick = time;
    if (!this.serverState) {
      return;
    }

    if (!this.clientState) {
      this.clientState = this.stateCopy(this.serverState);
    }
    if (!this.clientState) {
      // impossible but need for ts.
      return;
    }

    this.clientState.lifecycle = this.serverState.lifecycle;

    // delete players not in server, but on client
    const serverPids = Object.keys(this.serverState.players)
    const clientPids = Object.keys(this.clientState.players)
    const diff = key_diff(clientPids, serverPids);
    for (let pid of diff) {
      delete this.clientState.players[pid];
    }

    // iterate all server players
    const playerCopyProps: PlayerKeys = ['host', 'name', 'fireballs']
    for (let pid of serverPids) {
      const servPlayer = this.serverState.players[pid];

      if (!this.clientState.players[pid]) {
        this.clientState.players[pid] = {
          x: servPlayer.x,
          y: servPlayer.y,
          host: servPlayer.host,
          name: servPlayer.name,
          angle: servPlayer.angle,
          fireballs: servPlayer.fireballs
          
        }
        continue;
      }
      
      // clientState = rendered sprites
      // serverState = real time sprites from server
      const player = this.clientState.players[pid];
      this.clientState.players[pid].x = Maths.lerp(player.x, servPlayer.x, dx / 100) // Update to deltaTime/50.
      this.clientState.players[pid].y = Maths.lerp(player.y, servPlayer.y, dx / 100) // Update to deltaTime/50.
      this.clientState.players[pid].angle = servPlayer.angle;

      for (let prop of playerCopyProps) {
        (this.clientState.players[pid] as any)[prop] = servPlayer[prop];
      }

      //Chris update fireballs here
      //for(let fireball of servPlayer.fireballs){
        
        
      //}
      
    }

  }

  getGameState(): RenderState {
    if (!this.room || !this.clientState) {
      return null;
    }

    if (this.clientState.lifecycle === 'lobby') {
      return {
        isLobbyState: true,
        sessionId: this.room!.sessionId,
        players: Object.assign({}, this.clientState.players),
        room: this.room!
      }
    }

    if (this.clientState.lifecycle === 'deathmatch') {
      return {
        isGameRenderState: true,
        frame: Date.now(),
        players: Object.assign({}, this.clientState.players)
      }
    }

    return null;
  }

}
