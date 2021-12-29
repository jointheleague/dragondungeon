import {
	Room,
	Client
} from 'colyseus';

import {
	GameState,
	Player,
	IInputs,
	Coin,
	Maths,
	Countdown,
	Fireball,
	CircleBat,
	LineSkull,
} from '../common';

import * as admin from 'firebase-admin';
import { v4 } from "uuid";

const botnames = require('./botnames.json');
const botwords = require('./wordlists/nouns.json');
const MAX_COINS_HELD = 30;

const serviceAccount = require('../config/private/adminsdk.json')

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })

export class GameRoom extends Room<GameState> {
	counter = 0;
	botTimeout = 0;
	maxClients = 15;

	redTeamIds: string[] = [];
	blueTeamIds: string[] = [];

	gameInt: NodeJS.Timeout;


	onCreate() {
		this.setState(new GameState())
		this.registerMessages();
		this.startGameLoop();
	}

	async onJoin(client: Client, options: { token: string }, _2: any) {
		const user = await admin.auth().verifyIdToken(options.token);
		console.log("creating player " + user.uid)
		const db = admin.firestore();
		let ballType = "fireball";
		let dragonSkin = "default";

		const userDoc = await db.collection(user.uid).doc("gameplay").get();
		if (userDoc.data()?.ballType) {
			ballType = userDoc.data()?.ballType;
		} else {
			switch ( Math.floor( Math.random() * 5 ) ) {
				case 0:
					 ballType = "fire";
					 break;
				case 1:
					ballType = "ice";
					  break;
				case 2:
					ballType = "poison";
					break;
				case 3:
					ballType = "mud";
					break;
				case 4:
					ballType = "electric";
					break;
			}
		}

		if (userDoc.data()?.dragonSkin) {
			dragonSkin = userDoc.data()?.dragonSkin;
		} else {
			switch ( Math.floor( Math.random() * 3 ) ) {
				case 0:
					 dragonSkin = "default";
					 break;
				case 1:
					dragonSkin = "light";
					  break;
				case 2:
					dragonSkin = "gold";
					break;
			}
		}

		var teamnum;
		if(this.state.gamemode == 'CTC'){
			if(this.redTeamIds.length<=this.blueTeamIds.length){
				teamnum = 1;
				this.redTeamIds.push(client.id);
			} else{
				teamnum = 2;
				this.blueTeamIds.push(client.id);
			}
		} else{teamnum = 0;}
		this.state.players[client.id] = new Player(ballType, dragonSkin, teamnum);

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
		
	}

	registerMessages() {
		this.onMessage("input", (client: Client, message: IInputs) => {
			this.state.players[client.sessionId].inputs(message);
		})
	}

	startGameLoop() {
		this.gameInt = setInterval(() => {
		
			this.clock.tick();
			this.tick();
			this.state.debugOn = !this.state.debugOn;
			
		}, 1000 / 60);
	}

	gameOver(){
		this.clock.clear();
		clearInterval(this.gameInt);
	}

	spawnCoin() {
	}

	createCoin(x: number, y: number) {
	}

	moveBot(bot: Player, right: boolean, left: boolean, up: boolean, down: boolean) {
		
	}

	checkWalls(newX: number, newY: number, rad: number, isFireball: boolean){
	
	}

	generateBotName() {
	
	}

	tick() {
		this.counter++;
		const dx = this.clock.deltaTime;
		this.state.countdown.elaspseTime();
		if (this.state.countdown.done) {
			this.gameOver();
		}

		for (let i = this.state.coins.size; i < this.state.players.size * 270; i++) {
			this.spawnCoin();
		}

		for(let bat of this.state.bats.values()){
			bat.move();
		}

		for(let skull of this.state.skulls.values()){
			skull.move();
		}

		for (let id of this.state.players.keys()) {

			this.state.players[id].tick(dx);

			for (let id2 of this.state.players.keys()) {
				for (let i = 0; i < this.state.players[id2].fireballs.length; i++) {
					if (id != id2) {
						if (this.state.players[id2].fireballs[i].checkHit(this.state.players[id].x, this.state.players[id].y, this.state.players[id].team)) {
						    this.state.players[id2].hitsDealt ++;
							this.state.players[id].hitsRecived ++;
							var fireBall = this.state.players[id2].fireballs[i];
							const coinChance = .2; // the possibility of removing a coin on collision with a fireball, this is done to spread out the coins more
							const lifetimeRemove = 1; // the lifetime decreace of the fireball for every coin it removes from a dragon (as if  it is heavier)

							this.state.players[id].push(fireBall.angle - Math.PI, fireBall.speed)
							//console.log(this.state.players[id].x + "    " + this.state.players[id].y)
							if (this.state.players[id].coins > 0 && Math.random() < coinChance) {
								this.state.players[id].coins--;
								fireBall.lifetime -= lifetimeRemove;
								if (fireBall.type == "poison" && this.state.players[id2].coins < 10) {
									this.state.players[id2].coins++;
									this.state.players[id2].coinsPickedUp++;
								} else {
									this.createCoin(this.state.players[id].x, this.state.players[id].y);
								}
							}


							switch (fireBall.type) {
								case "electric":
									if (this.state.players[id2].fireballs.length < 10 && Math.random() > .9) {
										const angle = Math.random() * 6.28;
										const newX = this.state.players[id].x + 50 * Math.cos(angle);
										const newY = this.state.players[id].y + 50 * Math.sin(angle);
										// TODO: Reimplement when checkWalls is a thing... again
										// if (!this.checkWalls(newX, newY, 22.5, true)) {
										// 	this.state.players[id2].fireballs.push(new Fireball(newX, newY, angle + Math.PI, 7, "electric", 20, 0));

										// }
									}
									break;
								case "mud":
									fireBall.width += 1;
									fireBall.height += 1.87;
									//fireBall.speed += .05;
									break;
								case "ice":
									this.state.players[id].deceleration = 2;
									break;
							}
						}
					}
				}

			}

			if (this.state.coinJar.checkHit(this.state.players[id].x, this.state.players[id].y, 0)) {
				// when a player has collided with the coinjar
				this.state.players[id].score += this.state.players[id].coins;// add coins to players score
				this.state.players[id].coins = 0;// remove coins
			}

			for(let cid of this.state.coins.keys()){
				if (this.state.coins[cid].checkHit(this.state.players[id].x, this.state.players[id].y, 0) && this.state.players[id].coins < 10) {
					
					var coins = this.state.players[id].coins;
					switch (this.state.coins[cid].getSize()) {
						case (20):
							coins++;
							break;
						case (25):
							coins += 2;
							break;
						case (30):
							coins += 4;
							break;
						case (100):
							this.state.players[id].score += 20;
							this.state.players[id].coinsPickedUp += 20;
							break;
					}
					this.state.players[id].coinsPickedUp += Math.min(coins, 10)-this.state.players[id].coins;
					this.state.players[id].coins = Math.min(coins,10);
					this.state.coins.delete(cid);
				}
			}

			for(let bat of this.state.bats.values()){
				if(bat.checkHit(this.state.players[id].x, this.state.players[id].y)){
					this.state.players[id].deceleration = 2 ;
					this.state.players[id].fireballCooldown += .2;
					break;
				}
			}
			
			for(let skull of this.state.skulls.values()){
				if(skull.checkHit(this.state.players[id].x, this.state.players[id].y)){
					this.state.players[id].push(skull.angle, skull.speed*1.2);
					if(Math.random() < .2 && this.state.players[id].coins > 0){
						this.state.players[id].coins --;
						if(Math.random() < .5 && this.state.players[id].score > 0){
							this.state.players[id].score --;
						}
					}
					break;
				}
			}
		}
	}
}