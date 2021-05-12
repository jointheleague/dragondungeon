import {
	getRandomInt
} from '@dragoncoin/common/build/maths';

import {
	Room,
	Client
} from 'colyseus';

import {
	GameState,
	Player,
	IInputs,
	Coin, 
	CoinJar,
	Bar
} from '@dragoncoin/common';

import * as admin from 'firebase-admin';
import { v4 } from "uuid";
const admin_sdk_key = require('../../top_secret/adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(admin_sdk_key)
});

export class GameRoom extends Room < GameState > {
	counter = 0;
	maxClients: 4

	onCreate() {
		this.setState(new GameState())
		this.registerMessages();
		this.startGameLoop();
	}

	async onJoin(client: Client, options: {token: string}, _2: any) {
		const user = await admin.auth().verifyIdToken(options.token);
		this.state.players[client.id] = new Player();
		this.state.players[client.id].onlineName = user.name;
		this.state.players[client.id].onlineID = user.uid;
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

	startGameLoop() {
		setInterval(() => {
			this.clock.tick();
			this.tick();
		}, 1000 / 60);
		
	}
	cancelGameLoop() {
		this.clock.clear()
	}

	tick() {
		this.counter++;
		const dx = this.clock.deltaTime;
		for (let id of this.state.players.keys()) {
			this.state.players[id].tick(dx);
			for (let id2 of this.state.players.keys()) {
				for (let i = 0; i < this.state.players[id2].fireballs.length; i++) {
					if (id != id2) {
						if (this.state.players[id2].fireballs[i].checkHit(this.state.players[id].x, this.state.players[id].y) == true) {
							this.state.players[id2].fireballs.splice(i, 1);
							if (this.state.players[id].coins > 0) {
								this.state.players[id].coins--;
								const rand = getRandomInt(0, 62) / 10;
								this.state.coins.set(v4(), new Coin(this.state.coins.size, this.state.players[id].x + 100 * Math.cos(rand), this.state.players[id].y + 100 * Math.sin(rand)));
							}
							if(this.state.players[id].score > 0){
								this.state.players[id].score--;
							}

						}
					}
				}
			}
			
			if(this.state.coinJar.checkHit(this.state.players[id].x, this.state.players[id].y)){
				this.state.players[id].score += this.state.players[id].coins;
				this.state.players[id].coins = 0;
			}

			//for (let i = 0; i < this.state.coins.size; i++) {
			for(let cid of this.state.coins.keys()){
				if (this.state.coins[cid].checkHit(this.state.players[id].x, this.state.players[id].y) == true && this.state.players[id].coins < 10) {
					this.state.coins.delete(cid);
					this.state.players[id].coins++;
				}
			}

			if(this.state.players[id].x<0){
				this.state.players[id].x=0;
			} else if(this.state.players[id].x>2000){
				this.state.players[id].x=2000;
			}

			if(this.state.players[id].y<0){
				this.state.players[id].y=0;
			} else if(this.state.players[id].y>2000){
				this.state.players[id].y=2000;
			}
			// console.log(id + "  " + this.state.players[id].score);
		}

		
		if(this.state.coins.size<100&&this.counter%100==0){
			this.state.coins.set(v4(), new Coin(this.state.coins.size, Math.random()*2000, Math.random()*2000));
		}
		
		
	}

}