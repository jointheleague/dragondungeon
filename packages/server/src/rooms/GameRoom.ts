import { CollectionSchema } from '@colyseus/schema';
import { getRandomInt } from '@league-toybox/common/build/maths';
import { Room, Client } from 'colyseus';
import {GameState, Player, IInputs, Fireball, Coin} from './game/GameState';

export class GameRoom extends Room<GameState> {

  maxClients: 4

  onCreate (){
      this.setState(new GameState())
      this.registerMessages();
      this.startGameLoop();
  }

  onJoin(client: Client, options: unknown, _2: any) {
    this.state.players[client.id] = new Player();
  }

  onLeave(client: Client, _consent: boolean) {
    if (!this.state.players[client.sessionId]) {
      return;
    }
    this.state.players.delete(client.sessionId);
  }

  registerMessages() {
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

//dragon collides with fireball code

    for(let id2 of this.state.players.keys()){
      for(let i=0; i<this.state.players[id2].fireballs.length; i++){
        if(id != id2){
          if(this.state.players[id2].fireballs[i].checkHit(this.state.players[id].x, this.state.players[id].y)==true){
            this.state.players[id2].fireballs.splice(i,1);
            if(this.state.players[id].score>0){
              this.state.players[id].score--;
              const rand = getRandomInt(0, 62)/10;
              this.state.coins.push(new Coin(this.state.coins.length,this.state.players[id].x+ 100*Math.cos(rand), this.state.players[id].y+100*Math.sin(rand)));
            }

          }
        }
      }
    }
//dragon collides with coin code
    for(let i = 0; i<this.state.coins.length; i++){
      if(this.state.coins[i].checkHit(this.state.players[id].x, this.state.players[id].y)==true){
        this.state.coins.splice(i,1);
        this.state.players[id].score++;
      }
    }

    console.log(id+"  "+this.state.players[id].score);
    }
  }

}
