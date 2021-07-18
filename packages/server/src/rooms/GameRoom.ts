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
	Bar,
	Maths,
	Countdown,
	Fireball
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
		this.state.countdown = new Countdown(5, 0);
	}

	async onJoin(client: Client, options: {token: string}, _2: any) {
		const user = await admin.auth().verifyIdToken(options.token);
		var s = "";
		switch(Math.floor(Math.random()*5)){
            case 0:
             	s = "fire";
             	break;
            case 1:
             	s = "ice";
              	break;
            case 2:
        		s = "poison";
            	break;
            case 3:
            	s = "mud";
            	break;
			case 4:
				s = "electricity";
				break;
          }
		this.state.players[client.id] = new Player(s);
		if (user.name == null) {
			const adjectives = require('../../wordlists/adjectives.json');
			const nouns = require('../../wordlists/nouns.json');
			const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
			const noun = nouns[Math.floor(Math.random() * nouns.length)];
			this.state.players[client.id].onlineName = `${adjective}-${noun}`.toLowerCase();
		} else {
			this.state.players[client.id].onlineName = user.name;
		}
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
			//console.log("got player input");
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
		this.state.countdown.elaspseTime();

		for(let i = this.state.coins.size; i < this.state.players.size * 5; i++) {
			this.state.coins.set(v4(), new Coin(this.state.coins.size, Math.random() * 2000, Math.random() * 2000));
		}

		for (let id of this.state.players.keys()) {
			this.state.players[id].tick(dx);

			for (let id2 of this.state.players.keys()) {
				for (let i = 0; i < this.state.players[id2].fireballs.length; i++) {
					if (id != id2) {
						if (this.state.players[id2].fireballs[i].checkHit(this.state.players[id].x, this.state.players[id].y) == true) {
						    var fireBall = this.state.players[id2].fireballs[i];
							const coinChance = .2; // the possibility of removing a coin on collision with a fireball, this is done to spread out the coins more
							const lifetimeRemove = 1; // the lifetime decreace of the fireball for every coin it removes from a dragon (as if  it is heavier)
							
							const newX = this.state.players[id].x + fireBall.speed * 2 * Math.cos(fireBall.angle + Math.PI);
							const newY = this.state.players[id].y + fireBall.speed * 2 * Math.sin(fireBall.angle + Math.PI);

							if(!Maths.checkWalls(this.state.players[id].x, newY)){
								this.state.players[id].y = newY;
							}
							if(!Maths.checkWalls(newX, this.state.players[id].y)){
								this.state.players[id].x = newX;
							}
							//console.log(this.state.players[id].x + "    " + this.state.players[id].y)
							if (this.state.players[id].coins > 0 && Math.random() < coinChance) {
								this.state.players[id].coins --;
								fireBall.lifetime -= lifetimeRemove;
								if(fireBall.type == "poison"){
									this.state.players[id2].coins ++;
								}else{
									const rand = getRandomInt(0, 62) / 10;

									const newX = this.state.players[id].x + 100 * Math.cos(rand)
									const newY = this.state.players[id].y + 100 * Math.sin(rand)
									if(!Maths.checkWalls(newX, newY)){
										this.state.coins.set(v4(), new Coin(this.state.coins.size, newX, newY, 20));
									}
								}
							}


							switch (fireBall.type) {
								case "electricity":
									if(this.state.players[id].fireballs.length < 20 &&  Math.random() > .9){
										var angle = Math.random() * 6.28;
										this.state.players[id2].fireballs.push(new Fireball(this.state.players[id].x + 45 * Math.cos(angle), this.state.players[id].y + 45 * Math.sin(angle), angle + Math.PI, 6, "electricity"));
									}
									break;
								case "mud":	
									fireBall.width += 1;
									fireBall.height += 1.87;
									break;
								case "ice":
									this.state.players[id].deceleration = 0.3;
									break;
							}
						}
					}
				}
				
				if(this.state.coinJar.checkHit(this.state.players[id].x, this.state.players[id].y)){
					// when a player has collided with the coinjar
					this.state.players[id].score += this.state.players[id].coins;// add coins to players score
					this.state.players[id].coins = 0;// remove coins
				}

				for(let cid of this.state.coins.keys()){
					if (this.state.coins[cid].checkHit(this.state.players[id].x, this.state.players[id].y) == true && this.state.players[id].coins < 10) {
						var coins = this.state.players[id].coins;
						switch(this.state.coins[cid].getSize()){
							case (20):
								coins ++;
								break;
							case (25):
								coins += 2;
								break;
							case (30):
								coins += 4;
								break;
							case (100):
								this.state.players[id].score += 50;
								break;
						}
						this.state.players[id].coins = Math.min(coins,10);
						this.state.coins.delete(cid);
					}
				}

				if(this.state.players[id].x < 0){
					this.state.players[id].x = 0;
				} else if(this.state.players[id].x > 2000){
					this.state.players[id].x = 2000;
				}

				if(this.state.players[id].y < 0){
					this.state.players[id].y = 0;
				} else if(this.state.players[id].y > 2000){
					this.state.players[id].y = 2000;
				}
				
			}
			// console.log(id + "  " + this.state.players[id].score);
		}
	}
}