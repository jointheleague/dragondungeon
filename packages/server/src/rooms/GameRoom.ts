import { Room, Client } from 'colyseus';
import {GameState, Player, IInputs, Fireball} from './game/GameState';

interface options {
  name?: string
}


function normalizeName(name?: string): string {
  if (!name) {
    return "nameless"
  }
  return name;
}

export class GameRoom extends Room<GameState> {
  onCreate (){
      this.setState(new GameState())
      this.registerMessages()
  }

  onJoin(client: Client, options: options, _2: any) {
    this.state.players[client.id] = new Player(
      /*name=*/normalizeName(options.name),
      /*host=*/this.state.players.size === 0
    );
  }

  onLeave(client: Client, _consent: boolean) {
    if (!this.state.players[client.sessionId]) {
      return;
    }
    const host = this.state.players[client.sessionId];
    this.state.players.delete(client.sessionId);
    if (!host) {
      return;
    }

    // assign new host
    const new_host = this.state.players.keys().next();
    if (new_host.done) {
      // room is empty
      return;
    }

    this.state.players[new_host.value].host = true;
  }

  registerMessages() {
    this.onMessage("start", (client) => {
      if (!this.state.players[client.sessionId]?.host) {
        throw 'Unpermitted operation'
      }
      this.enterDeathmatch();
    })

    this.onMessage("input", (client: Client, message: IInputs) => {
      this.state.players[client.sessionId].inputs(message);
    })
  }

  makeFireball(){
    
  }

  startGameLoop() {
    setInterval(() => {
      this.clock.tick();
      this.tick();
    }, 1000/60);
  }
  cancelGameLoop() {
    this.clock.clear()
  }

  tick() {
    const dx = this.clock.deltaTime;
    for (let id of this.state.players.keys()) {
      this.state.players[id].tick(dx);
    }
  }

  enterDeathmatch() {
    this.state.lifecycle = 'deathmatch';
    this.startGameLoop()
    this.lock()
  }

  enterLobby() {
    this.state.lifecycle = 'lobby';
    this.cancelGameLoop();
    this.unlock();
  }

}
